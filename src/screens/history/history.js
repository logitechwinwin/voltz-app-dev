import { StyleSheet, View } from "react-native";

import { Container, Flex, Typography } from "../../atom-components";
import { ChevronBackIcon } from "../../assets";
import { SearchField } from "../../components";
import { sizer } from "../../helpers";
import { COLORS } from "../../globals";
import TabsComponent from "./tabs-component";

const History = () => {
  return (
    <Container>
      <Flex
        flexStyle={{ marginTop: sizer.moderateVerticalScale(10) }}
        jusContent="space-between"
      >
        <ChevronBackIcon />
        <Typography text="History" color={COLORS.blackV1} semiBold />
        <View />
      </Flex>
      <SearchField />
      <TabsComponent />
    </Container>
  );
};

export default History;

const styles = StyleSheet.create({});
