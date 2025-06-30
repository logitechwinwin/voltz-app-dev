import React from "react";
import { Image, ScrollView, View } from "react-native";

import { styles } from "./styles";
import { Container, Typography } from "../../../atom-components";
import { AuthLinkButton, PrimaryButton } from "../../../components";

export default function Welcome({ navigation }) {
  const imgPath = "../../../assets/images/welcome-background/image.png";

  const handleLogin = () => {};

  return (
    <Container light pH={33}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.banner}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode="stretch"
              source={require(imgPath)}
            />
            <View style={styles.typoView}>
              <Typography
                {...styles.bannerText}
                text="Valuing volunteers and"
              />
              <Typography {...styles.bannerText} text="and causes." />
            </View>
          </View>
        </View>
        <PrimaryButton
          label="Get Started"
          onPress={() => navigation.navigate("OnboardSlider")}
          mb={50}
        />
      </ScrollView>
    </Container>
  );
}
