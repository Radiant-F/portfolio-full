import {
  ButtonCustom,
  ErrorIndicator,
  LoadingIndicator,
  Socials,
} from "@/components";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetContactQuery } from "@/features/contact";
import { usePublicTheme } from "@/hooks";

export default function Contact() {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { t } = useTranslation();
  const theme = usePublicTheme();
  const { isError, isFetching, isSuccess, data, refetch } =
    useGetContactQuery(null);

  async function onVisit(url: string) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      alert(`Cannot open url. Error detail: ${JSON.stringify(error)}`);
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: bottomInset + 20,
          paddingTop: 20,
        }}
      >
        <Text style={{ ...styles.textTitle, color: theme.text }}>
          {t("public.contact.title-prefix")}{" "}
          <Text style={{ color: theme.accentContrastText }}>
            {t("public.contact.title-highlight")}
          </Text>
        </Text>

        <View style={{ gap: 20, padding: 20 }}>
          {isFetching && <LoadingIndicator />}
          {isError && <ErrorIndicator onPressRefresh={refetch} />}
          {isSuccess &&
            data.map((v) => (
              <View
                key={v.id}
                style={{ ...styles.item, backgroundColor: theme.surface }}
              >
                <Socials platform={v.platform} width={30} height={30} />
                <Text style={{ ...styles.textItem, color: theme.text }}>
                  {v.title}
                </Text>
                <ButtonCustom
                  style={{
                    ...styles.btnVisit,
                    backgroundColor: theme.buttonSecondaryBackground,
                  }}
                  onPress={() => onVisit(v.url)}
                >
                  <MCIcons
                    color={theme.buttonSecondaryText}
                    size={20}
                    name="open-in-new"
                  />
                  <Text
                    selectable={false}
                    style={{
                      ...styles.textVisit,
                      color: theme.buttonSecondaryText,
                    }}
                  >
                    {t("public.contact.visit")}
                  </Text>
                </ButtonCustom>
              </View>
            ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  textItem: {
    fontWeight: "600",
    fontSize: 20,
  },
  textVisit: {
    fontWeight: "600",
  },
  btnVisit: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
  },
  item: {
    elevation: 5,
    borderRadius: 20,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 27,
  },
  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
});
