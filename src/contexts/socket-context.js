import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { socketConnectionPromise, newSocketConnectionPromise } from "../socket";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, isLogged }) => {
  const socketInstance = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isLogged) {
      newSocketConnectionPromise()
        .then((socket) => {
          socketInstance.current = socket;
          setIsConnected(socket?.connected);

          socket.on("connect", () => {
            setIsConnected(true);
          });
        })
        .catch((error) => {
          console.error("Error connecting to socket:", error);
        });
    }

    return () => {
      if (socketInstance.current) {
        socketInstance.current.disconnect();
        console.log("Socket disconnect");
      }
    };
  }, [isLogged]);

  function reconnectSocket() {
    newSocketConnectionPromise()
      .then((socket) => {
        socketInstance.current = socket;
        setIsConnected(socket.connected);
      })
      .catch((error) => {
        console.error("Error reconnecting to socket:", error);
      });
  }

  return (
    <SocketContext.Provider
      value={{ socket: socketInstance.current, isConnected, reconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
