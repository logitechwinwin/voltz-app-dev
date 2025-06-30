import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Container, Typography } from "../../atom-components";
import {
  DonationModal,
  Header,
  NotificationList,
  UrgentDontaion,
} from "../../components";
import { COLORS, baseOpacity } from "../../globals";
import DATA from "./data";

const Notifications = () => {
  const [visible, setVisible] = useState(false);
  const [donationVisible, setDonationModal] = useState(false);
  const [item, setItem] = useState({});
  return (
    <Container>
      <Header back />
      <View style={styles.main}>
        <TouchableOpacity activeOpacity={baseOpacity}>
          <Typography
            text="Mark all as read"
            color={COLORS.primary}
            size={12}
            semiBold
            mT={14}
            mB={8}
            textAlign="right"
          />
        </TouchableOpacity>

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <NotificationList item={item} setVisible={setVisible} setItem = {setItem} />
          )}
          ItemSeparatorComponent={<Divider />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
        />

        <UrgentDontaion
          isVisible={visible}
          setVisible={setVisible}
          setDonationModal={setDonationModal}
        />

        <DonationModal
          data={item}
          isVisible={donationVisible}
          setVisible={setDonationModal}
        />
      </View>
    </Container>
  );
};

export default Notifications;

const Divider = () => <View style={styles.divider} />;
