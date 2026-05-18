import {
  CMS_DESIGN_ORDER,
  DesignVariant,
  getDesignDefinition,
} from "@/constants/theme";
import { useAppDispatch, useAppSelector, useTheme } from "@/hooks";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { setDesign } from "../services/appSettingsSlice";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Design() {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const isWide = width >= 920;
  const { colors, isDark, radius, typography, design } = useTheme();

  const currentDesign = useAppSelector((s) => s.appSettings.design);
  function handleDesign(nextDesign: DesignVariant) {
    dispatch(setDesign(nextDesign));
  }

  return (
    <>
      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textSecondary, fontFamily: typography.mono },
        ]}
      >
        DESIGN
      </Text>

      <View style={styles.designGrid}>
        {CMS_DESIGN_ORDER.map((designKey, index) => {
          const option = getDesignDefinition(designKey);
          const preview = isDark ? option.colors.dark : option.colors.light;
          const active = currentDesign === designKey;

          return (
            <Animated.View
              key={designKey}
              entering={FadeInDown.delay(index * 35).duration(260)}
              style={{ width: isWide ? "48.8%" : "100%" }}
            >
              <TouchableOpacity
                onPress={() => handleDesign(designKey)}
                style={[
                  styles.designCard,
                  {
                    backgroundColor: active
                      ? colors.card
                      : colors.surfaceRaised,
                    borderColor: active ? colors.primary : colors.cardBorder,
                    borderWidth: active
                      ? Math.max(2, design.chrome.borderWeight)
                      : design.chrome.borderWeight,
                    borderRadius: radius.lg,
                  },
                ]}
              >
                <View>
                  {active && (
                    <MCIcons
                      style={styles.selected}
                      name="hamburger-check"
                      size={25}
                      color={"green"}
                    />
                  )}

                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: typography.bodyBold,
                      fontSize: 16,
                    }}
                  >
                    {option.label}
                  </Text>
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontFamily: typography.body,
                      fontSize: 13,
                      lineHeight: 20,
                      marginTop: 6,
                    }}
                  >
                    {option.summary}
                  </Text>
                </View>

                <View style={styles.previewRow}>
                  {[
                    preview.heroStart,
                    preview.heroEnd,
                    preview.primary,
                    preview.accent,
                  ].map((swatch) => (
                    <View
                      key={swatch}
                      style={[
                        styles.previewSwatch,
                        {
                          backgroundColor: swatch,
                          borderRadius: radius.sm,
                        },
                      ]}
                    />
                  ))}
                </View>

                <View
                  style={[
                    styles.designPreviewCard,
                    {
                      backgroundColor: preview.surface,
                      borderColor: preview.cardBorder,
                      borderRadius: radius.md,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.previewHeader,
                      { borderBottomColor: preview.cardBorder },
                    ]}
                  >
                    <MCIcons
                      name={option.icon as any}
                      size={16}
                      color={preview.primary}
                    />
                    <Text
                      style={{
                        color: preview.text,
                        fontFamily: typography.bodyBold,
                        fontSize: 13,
                      }}
                    >
                      CMS shell preview
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: preview.textSecondary,
                      fontFamily: typography.body,
                      fontSize: 12,
                    }}
                  >
                    Header, dashboard cards, list rows, and forms inherit this
                    system.
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  selected: {
    position: "absolute",
    right: 0,
    opacity: 0.5,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  previewRow: {
    flexDirection: "row",
    gap: 8,
  },
  previewSwatch: {
    width: 32,
    height: 18,
  },
  designPreviewCard: {
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  designCard: {
    padding: 16,
    gap: 12,
  },
  designGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 6,
  },
});
