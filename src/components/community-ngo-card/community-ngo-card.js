import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

import { sizer } from "../../helpers";
import { Flex, Typography } from "../../atom-components";
import { COLORS } from "../../globals";
import GroupedAvatar from "../grouped-avatar/grouped-avatar";
import PrimaryButton from "../custom-buttons/primary-button/primary-button";

const FollowingCard = ({ imgUrl, name, subText, subText2 }) => {
  return (
    <View style={styles.main}>
      <Flex algItems="center" gap={10}>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/b023/f571/c6740459662c647490916474a82e8407?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PChZiklBAMV7~r2bYjNHcnHUtpnNo4QmRfaq9EVdjGqV7PW4BB~-rChc8qrtKBkyvJ8oRJX0syaaveF66EA5SlCGZEQUWFa~Z7CtJJbxI4-X0ajs-eR98S84XhXfEFwap2QA2-jTkxTlHt52QbwT7Drhc0FYfSW04xDbccFuQegTC27sUql2SAZ6ZkEzEVsYVzbFaTZcvqaJ3s85hC1XBgOHJivzcOgHh0AAEIdWqOwZ9lUT3V2qlGzsuDQvScNYURR2Q8vrxzSTxDOcuc29E0FqQ6Vbnaeo4Tg9hB5KMvDs0UEGnE86BXr7sckOhbzHXZ6LW6qxVvc9uq~~-NntfQ__",
          }}
          style={styles.img}
        />
        <View>
          <Typography text={name} semiBold color="#27272E" />
          <Typography text={subText} color="#27272E" size={10} />
          <Typography text={subText2} color="#A3A3A3" size={9} />
        </View>
      </Flex>
      <Flex gap={2} mt={9}>
        <GroupedAvatar />
        <Typography
          text="Brad and 13 others donated"
          color="#969696"
          size={11}
        />
      </Flex>
      <PrimaryButton
        mt={9}
        height={28}
        textStyle={{ fontSize: 10 }}
        label="Joined"
        icon={
          <Icon name="check" size={sizer.fontScale(8)} color={COLORS.white} />
        }
      />
    </View>
  );
};

export default FollowingCard;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(257),
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    backgroundColor: "#fff",
    borderRadius: sizer.fontScale(24),
    paddingHorizontal: sizer.moderateScale(13),
    paddingVertical: sizer.moderateVerticalScale(13),
    marginTop: sizer.moderateVerticalScale(14),
    marginBottom: sizer.moderateVerticalScale(1),
  },
  img: {
    width: sizer.moderateScale(61),
    height: sizer.moderateScale(61),
    border: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 50,
  },
});
