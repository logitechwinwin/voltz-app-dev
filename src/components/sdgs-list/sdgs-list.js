import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Flex } from "../../atom-components";
import { sizer } from "../../helpers";

const SDGsList = ({ sdgs = []}) => {

  return (
    <Flex gap={16} mt={21} flexWrap="wrap" jusContent="space-between">
      {sdgs.map((item, i) => (
        <View 
          key={i}
          style={[styles.main]}
        >
          <Image
            source={{ uri: item?.image }}
            style={[
              {
                width: sizer.moderateScale(75),
                height: sizer.moderateVerticalScale(75),
              },
            ]}
          />
        </View>
      ))}
    </Flex>
  );
};

export default SDGsList;

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
});
