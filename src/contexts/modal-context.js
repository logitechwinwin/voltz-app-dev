import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isVisible, showModal, hideModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);