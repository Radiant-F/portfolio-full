import { ButtonCustom } from "@/components";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HeroDescription, Wave, WorkPreview } from "@/features/home";

export default function Index() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isWideSocial = width >= 450;

  return (
    <View style={{ flex: 1 }}>
      <Wave />

      <View
        style={{
          ...styles.containerHero,
          flexDirection: isWide ? "row" : "column",
        }}
      >
        <View style={styles.viewHero}>
          {/* Hero Section */}
          <View style={styles.viewHeroText}>
            <Text style={styles.textHero}>
              {`Heya!\nThe name is `}
              <Text style={{ color: "rgb(158, 213, 255)" }}>Radiant</Text>.
            </Text>

            {/* Hero Description component (incase your derpy eyes missed it) */}
            <View style={{ height: 40 }}>
              <HeroDescription />
            </View>

            <View style={{ gap: 10 }}>
              <ButtonCustom
                style={styles.btnPrimary}
                containerStyle={{ alignSelf: "flex-start" }}
              >
                <MCIcons
                  color={"rgb(24, 34, 68)"}
                  size={25}
                  name="shape-outline"
                />
                <Text selectable={false} style={styles.textBtnPrimary}>
                  My works
                </Text>
              </ButtonCustom>
              <ButtonCustom
                style={styles.btnSecondary}
                containerStyle={{ alignSelf: "flex-start" }}
              >
                <MCIcons
                  color={"rgb(224, 242, 255)"}
                  size={25}
                  name="message-text-fast"
                />
                <Text selectable={false} style={styles.textBtnSecondary}>
                  Contact
                </Text>
              </ButtonCustom>
            </View>
          </View>

          <View style={styles.viewSocial}>
            {[...Array(5).keys()].slice(0, isWideSocial ? 5 : 4).map((i) => (
              <ButtonCustom style={styles.btnSocial} key={i}>
                <MCIcons
                  name="ab-testing"
                  color={"rgb(224, 242, 255)"}
                  size={25}
                />
              </ButtonCustom>
            ))}
          </View>
        </View>

        <WorkPreview />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeroText: {
    gap: 15,
    flex: 1,
    justifyContent: "center",
    maxWidth: 450,
    // backgroundColor: "aqua",
    paddingHorizontal: 25,
  },
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
  viewHero: {
    // backgroundColor: "dodgerblue",
    height: "100%",
    justifyContent: "space-evenly",
  },

  containerHero: {
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "aqua",
    flex: 1,
  },
  textBtnSecondary: {
    color: "rgb(224, 242, 255)",
    fontWeight: "600",
  },
  btnSecondary: {
    backgroundColor: "rgb(39, 48, 58)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
  },
  textBtnPrimary: {
    color: "rgb(24, 34, 68)",
    fontWeight: "600",
  },
  btnPrimary: {
    backgroundColor: "rgb(158, 213, 255)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
  },
  textHero: {
    color: "rgb(224, 242, 255)",
    fontWeight: "600",
    fontSize: 55,
    // backgroundColor: "dodgerblue",
  },
});
