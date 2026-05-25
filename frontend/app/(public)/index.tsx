import { ButtonCustom } from "@/components";
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Index() {
  const { width } = useWindowDimensions();
  const BREAKPOINT = 900;
  const isWide = width >= BREAKPOINT;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.containerHero,
          flexDirection: isWide ? "row" : "column",
        }}
      >
        <View style={styles.viewHero}>
          <View style={styles.viewHeroText}>
            <Text style={styles.textHero}>
              {`Continuing the\nlegacy of `}
              <Text style={{ color: "rgb(158, 213, 255)" }}>Koi</Text>
            </Text>
            <Text style={{ color: "rgb(172, 193, 210)" }}>
              Customize your mobile experience through ReVanced by applying
              patches to your applications.
            </Text>
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
            {[...Array(5).keys()].map((i) => (
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

        {isWide && (
          <View style={styles.viewWorkPreview}>
            <Image
              source={require("@/assets/images/qing.png")}
              resizeMethod="resize"
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeroText: {
    gap: 20,
    flex: 1,
    justifyContent: "center",
    maxWidth: 450,
    // backgroundColor: "aqua",
  },
  viewSocial: {
    flexDirection: "row",
    paddingVertical: 40,
    paddingLeft: 0,
    // backgroundColor: "tomato",
    gap: 10,
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
  viewWorkPreview: {
    backgroundColor: "rgb(30, 31, 36)",
    elevation: 5,
    borderRadius: 20,
    width: 400,
    height: 550,
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
  },
});
