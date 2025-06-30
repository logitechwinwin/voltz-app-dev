import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";

import { Flex, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import { sizer } from "../../../helpers";
import { OutlineSelect } from "../../index";

const SuggestedFriendsCard = ({ item }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  return (
    <View style={styles.main}>
      <Flex gap={11} algItems="center" mb={8}>
        <Avatar.Image
          source={item.img}
          style={{backgroundColor: "transparent"}}
        />
        <View>
          <Typography text={item.name} bold size={14} />
          <Typography text="1,200 Voltz" bold size={9} color={COLORS.greyV6} />
        </View>
      </Flex>

      <OutlineSelect
        inActiveText="Follow"
        item={item}
        activeText="Followed"
        onSelect={handleSelect}
        isSelected={selectedItems.includes(item.id)}
      />
    </View>
  );
};

export default SuggestedFriendsCard;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(171),
    marginTop: sizer.moderateVerticalScale(24),
    backgroundColor: COLORS.white,
    paddingHorizontal: sizer.moderateScale(11),
    paddingVertical: sizer.moderateVerticalScale(12),
    borderRadius: sizer.fontScale(8),
  },
});
