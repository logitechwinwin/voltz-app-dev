import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Flex } from "../../atom-components";
import { COLORS, baseOpacity } from "../../globals";
import { sizer } from "../../helpers";

const SDGs = ({ sdgs, setSdgs }) => {
  const handleSelectImages = (id) => {
    const updatedSdgs = sdgs.map((obj) => {
      return obj.id === id ? { ...obj, isSelected: !obj.isSelected } : obj;
    });
    setSdgs(updatedSdgs, "sdgs");
  };

  return (
    <Flex gap={16} mt={21} flexWrap="wrap" jusContent="space-between">
      {sdgs.map((item, i) => (
        <TouchableOpacity
          activeOpacity={baseOpacity}
          key={i}
          onPress={() => {
            handleSelectImages(item.id);
          }}
          style={[styles.main, item.isSelected && styles.clickedMain]}
        >
          <Image
            source={{ uri: item?.image }}
            style={[
              item.isSelected && {
                borderRadius: 7,
              },
              {
                width: sizer.moderateScale(75),
                height: sizer.moderateVerticalScale(75),
              },
            ]}
          />
          {item.isSelected && (
            <View style={styles.tickView}>
              <Icon name="check" size={10} color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </Flex>
  );
};

export default SDGs;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(75),
    height: sizer.moderateScale(75),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    justifyContent: "center",
    alignItems: "center",
  },
  clickedMain: {
    transform: [{ scale: 0.9 }],
    borderRadius: 10,
  },
  tickView: {
    width: sizer.moderateScale(19),
    height: sizer.moderateScale(19),
    borderRadius: 100,
    position: "absolute",
    bottom: sizer.moderateVerticalScale(63),
    left: sizer.moderateScale(60),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
});
