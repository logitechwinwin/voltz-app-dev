import React from "react";
import { Image, View } from "react-native";

import { styles } from "./styles";
import { renderSvg } from "../../utils";
import {
  OnboardAvatar,
  OnboardCard2,
  OnboardCard3,
} from "../../assets";
import { COLORS } from "../../globals";
import { Container, Typography } from "../../atom-components";

export default function SliderContent({ item, width }) {
  const index = item?.index;

  const RenderCards = () => {
    return index == 0 ? (
      <View style={[styles.cardCom, styles.cardView1]}>
        <Image style={styles.cardImg1} source={item?.cardImg} />
      </View>
    ) : index == 1 ? (
      <>
        <View style={[styles.cardCom, styles.cardView2]}>
          {renderSvg(OnboardCard2, 327, 86, true)}
        </View>
        <View style={styles.onboardAvatar}>
          {renderSvg(OnboardAvatar, 48, 48)}
          <Typography {...styles.userName} text="Sean" />
        </View>
        <View style={styles.voltzCard}>
          <Typography {...styles.voltzText} text="+5 Voltz" />
        </View>
      </>
    ) : (
      <View style={[styles.cardCom, styles.cardView3]}>
        {renderSvg(OnboardCard3, 309, 49, true)}
      </View>
    );
  };

  return (
    <Container style={{ width: width }} pH={0} light>
      <View style={styles.main}>
        <View style={styles.bannerView}>
          <Image
            source={item?.backgroundImg}
            resizeMode="contain"
            style={styles.backgroundImg}
          />
          <RenderCards />
        </View>
        <Typography size={24} bold textAlign="center">
          {item?.title}
        </Typography>
        <Typography size={14} medium textAlign="center" color={COLORS.text}>
          {item?.description}
        </Typography>
      </View>
    </Container>
  );
}
