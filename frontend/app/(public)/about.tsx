import { ErrorIndicator, LoadingIndicator } from "@/components";
import { LocaleType } from "@/constants/language";
import { useGetAboutQuery } from "@/features/about";
import { AboutResponse } from "@/features/about/about";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePublicTheme } from "@/hooks";
import { ButtonCustom } from "@/components";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AboutItemProps = {
  item: AboutResponse;
  activeLanguage: LocaleType;
};

function AboutItem({ item, activeLanguage }: AboutItemProps) {
  const theme = usePublicTheme();
  const [expanded, setExpanded] = useState(false);

  const title = item.titleI18n?.[activeLanguage] ?? item.title;
  const content = item.contentI18n?.[activeLanguage] ?? item.content;

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }

  return (
    <View style={{ ...styles.item, backgroundColor: theme.surface }}>
      <ButtonCustom style={styles.header} onPress={toggle}>
        <Text
          style={{ ...styles.textTitleItem, color: theme.text }}
          selectable={false}
          numberOfLines={2}
        >
          {title}
        </Text>
        <MCIcons
          color={theme.textSecondary}
          size={26}
          name={expanded ? "chevron-up" : "chevron-down"}
        />
      </ButtonCustom>

      {expanded && (
        <View style={{ ...styles.body, borderTopColor: theme.border }}>
          <Text style={{ color: theme.textSecondary, lineHeight: 22 }}>
            {content}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function About() {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const theme = usePublicTheme();
  const { isError, isFetching, isSuccess, data, refetch } =
    useGetAboutQuery(null);

  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).split(
    "-",
  )[0] as LocaleType;

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        paddingBottom: bottomInset + 20,
        paddingTop: 20,
      }}
    >
      <Text style={{ ...styles.textTitle, color: theme.text }}>
        {t("public.about.title-prefix")}{" "}
        <Text style={{ color: theme.accentContrastText }}>
          {t("public.about.title-highlight")}
        </Text>
      </Text>

      <View style={{ gap: 20, padding: 20 }}>
        {isFetching && <LoadingIndicator />}
        {isError && <ErrorIndicator onPressRefresh={refetch} />}
        {isSuccess &&
          data.map((v) => (
            <AboutItem key={v.id} item={v} activeLanguage={activeLanguage} />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 15,
  },
  textTitleItem: {
    fontWeight: "600",
    fontSize: 18,
    flex: 1,
  },
  body: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  item: {
    elevation: 5,
    borderRadius: 20,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
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
