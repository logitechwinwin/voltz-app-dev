import { View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";

import { styles } from "./styles";
import { Typography } from "../../atom-components";
import { sizer } from "../../helpers";
import { COLORS } from "../../globals";

const NotificationList = ({ item, setVisible, setItem }) => {
  return (
    <>
      <TouchableRipple
        onPress={() => {
          setItem(item);
          setVisible(true);
        }}
        style={styles.container}
      >
        <View style={styles.main}>
          <Avatar.Image
            size={sizer.fontScale(45)}
            source={require("../../assets/images/stories.png")}
            style={{ backgroundColor: COLORS.whiteV1 }}
          />
          <View style={{ flex: 1 }}>
            <Typography text={item.name} size={14} bold />
            <Typography
              text={item?.description}
              size={12}
              color={COLORS.primary}
              mT={2}
            />
            <Typography
              text={item.date}
              size={10}
              medium
              color={COLORS.greyV5}
              mT={2}
            />
          </View>
          <View
            style={[
              styles.readDot,
              {
                backgroundColor: item?.read ? COLORS.secondary : COLORS.greyV3,
              },
            ]}
          />
        </View>
      </TouchableRipple>
    </>
  );
};

export default NotificationList;
