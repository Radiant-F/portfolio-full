import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { useGetWorksQuery, useDeleteWorkMutation } from "@/features/work";
import type { WorkResponse } from "@/features/work/work";
import { Button } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

function WorkRow({
  item,
  onDelete,
}: {
  item: WorkResponse;
  onDelete: (id: string) => void;
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOutLeft.duration(200)}
      layout={Layout.springify()}
      style={[
        styles.row,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <Image
        source={{ uri: item.iconUrl }}
        style={styles.icon}
        contentFit="cover"
      />

      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text
          style={[styles.rowSub, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          <Text style={[styles.badge, { color: colors.textMuted }]}>
            {item.screenshots.length} 📸
          </Text>
          <Text style={[styles.badge, { color: colors.textMuted }]}>
            {item.links.length} 🔗
          </Text>
          {item.tags.length > 0 && (
            <Text style={[styles.badge, { color: colors.primary }]}>
              {item.tags.map((t) => t.name).join(", ")}
            </Text>
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 6 }}>
        <Button
          onPress={() => router.push(`/(app)/work/${item.id}` as any)}
          style={[styles.iconBtn, { backgroundColor: colors.surfaceAlt }]}
        >
          <MCIcons name="pencil" size={16} color={colors.textSecondary} />
        </Button>
        <Button
          onPress={() =>
            Alert.alert(t("cms.confirm"), t("cms.confirm-delete"), [
              { text: t("cms.cancel"), style: "cancel" },
              {
                text: t("cms.delete"),
                style: "destructive",
                onPress: () => onDelete(item.id),
              },
            ])
          }
          style={[styles.iconBtn, { backgroundColor: colors.errorLight }]}
        >
          <MCIcons name="trash-can-outline" size={16} color={colors.error} />
        </Button>
      </View>
    </Animated.View>
  );
}

export default function WorkCMS() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { data: works, isLoading } = useGetWorksQuery(null);
  const [deleteWork] = useDeleteWorkMutation();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <FlatList
        data={works ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          { backgroundColor: colors.background },
        ]}
        ListHeaderComponent={
          <Animated.View
            entering={FadeInDown.duration(300)}
            style={styles.header}
          >
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.work.title")}
            </Text>
            <Button
              onPress={() => router.push("/(app)/work/create" as any)}
              style={[styles.createBtn, { backgroundColor: colors.primary }]}
            >
              <MCIcons name="plus" size={18} color={colors.primaryForeground} />
              <Text
                style={[
                  styles.createBtnText,
                  { color: colors.primaryForeground },
                ]}
              >
                {t("cms.create")}
              </Text>
            </Button>
          </Animated.View>
        }
        renderItem={({ item }) => (
          <WorkRow item={item} onDelete={(id) => deleteWork(id)} />
        )}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              color={colors.primary}
              style={{ marginTop: 40 }}
            />
          ) : (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              {t("cms.no-items")}
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pageTitle: { fontSize: 22, fontFamily: "LexendBold" },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  createBtnText: { fontFamily: "LexendBold", fontSize: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  rowTitle: { fontFamily: "LexendBold", fontSize: 14 },
  rowSub: { fontFamily: "LexendRegular", fontSize: 13, marginTop: 2 },
  badge: { fontFamily: "LexendRegular", fontSize: 12 },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "LexendRegular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
});
