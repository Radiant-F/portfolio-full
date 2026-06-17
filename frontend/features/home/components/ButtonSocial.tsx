import { Linking, StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import { useGetContactQuery } from "@/features/contact";
import { ButtonCustom, Socials } from "@/components";

export default function ButtonSocial() {
  const { isSuccess, data } = useGetContactQuery(null);
  const { width } = useWindowDimensions();
  const isWide = width >= 450;

  async function onVisit(url: string) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      alert(`Cannot open url. Error detail: ${JSON.stringify(error)}`);
    }
  }

  if (!isSuccess) return;
  else
    return (
      <View style={styles.viewSocial}>
        {data.slice(0, isWide ? 5 : 4).map((v) => (
          <ButtonCustom
            style={styles.btnSocial}
            key={v.id}
            onPress={() => onVisit(v.url)}
          >
            <Socials platform={v.platform} width={30} height={30} />
          </ButtonCustom>
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
  viewSocial: {
    flexDirection: "row",
    paddingVertical: 40,
    // backgroundColor: "tomato",
    gap: 10,
    paddingHorizontal: 25,
  },
  btnSocial: {
    backgroundColor: "rgb(39, 48, 58)",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
