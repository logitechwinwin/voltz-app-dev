import { FlatList, TouchableOpacity, View } from "react-native";

import { Container, Flex, Typography } from "../../atom-components";
import { HeaderWithTitle, SearchField } from "../../components";
import { sizer } from "../../helpers";
import { baseOpacity } from "../../globals";
import { Avatar } from "react-native-paper";
import { ChevronRightBold } from "../../assets";
import DATA from "./data";

const ViewAllPartners = () => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={baseOpacity} onPress={() => {}}>
        <Flex
          flexStyle={{ marginTop: sizer.moderateVerticalScale(15) }}
          algItems="center"
          jusContent="space-between"
        >
          <Flex flexStyle={{ alignItems: "center" }} jusContent="center">
            <Avatar.Image source={item.img} style={{backgroundColor: "white"}}/>
            <View style={{ marginLeft: sizer.moderateScale(15)}}>
              <Typography text={item.title} semiBold />
              <Typography text={item.disc} color="#757575" size={12} />
            </View>
          </Flex>

          <Flex algItems="center">
            <ChevronRightBold />
          </Flex>
        </Flex>
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <HeaderWithTitle label="Partners" />
      <View style={{ marginBottom: sizer.moderateVerticalScale(12) }}>
        <SearchField />
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default ViewAllPartners;
