import * as React from "react";
import { Menu } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import { Typography } from "../index";
import { COLORS } from "../../globals";
import { sizer } from "../../helpers";

const EllipsisMenu = ({ item }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      contentStyle={{
        backgroundColor: COLORS.white,
        width: 100,
      }}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <Typography size={24} bold>
            ...
          </Typography>
        </TouchableOpacity>
      }
    >
      <Menu.Item
        titleStyle={{ fontSize: sizer.fontScale(13) }}
        onPress={() => {
          closeMenu();
        }}
        title="Report"
      />
    </Menu>
  );
};

export default EllipsisMenu;
