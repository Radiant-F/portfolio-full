import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";
import {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from "@/features/tag";
import type { TagResponse } from "@/features/tag/tag";
import { Button, FormInput } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type CreateForm = { name: string };

function TagRow({
  tag,
  onDelete,
}: {
  tag: TagResponse;
  onDelete: (id: string) => void;
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [updateTag, { isLoading }] = useUpdateTagMutation();
  const { control, handleSubmit, reset } = useForm<{ name: string }>({
    defaultValues: { name: tag.name },
  });

  async function save({ name }: { name: string }) {
    if (!name.trim() || name === tag.name) {
      setIsEditing(false);
      return;
    }
    await updateTag({ id: tag.id, body: { name } }).unwrap();
    setIsEditing(false);
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOutUp.duration(200)}
      layout={Layout.springify()}
      style={[
        styles.tagRow,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      {isEditing ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Controller
            control={control}
            name="name"
            rules={{ required: true, minLength: 1 }}
            render={({ field: { value, onChange } }) => (
              <FormInput
                value={value}
                onChangeText={onChange}
                containerStyle={{ flex: 1, marginBottom: 0 }}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleSubmit(save)}
              />
            )}
          />
          <Button
            onPress={handleSubmit(save)}
            style={[styles.iconBtn, { backgroundColor: colors.primaryLight }]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <MCIcons name="check" size={18} color={colors.primary} />
            )}
          </Button>
          <Button
            onPress={() => {
              setIsEditing(false);
              reset();
            }}
            style={[styles.iconBtn, { backgroundColor: colors.surfaceAlt }]}
          >
            <MCIcons name="close" size={18} color={colors.textSecondary} />
          </Button>
        </View>
      ) : (
        <>
          <View
            style={[styles.tagChip, { backgroundColor: colors.primaryLight }]}
          >
            <Text style={[styles.tagText, { color: colors.primary }]}>
              {tag.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Button
              onPress={() => setIsEditing(true)}
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
                    onPress: () => onDelete(tag.id),
                  },
                ])
              }
              style={[styles.iconBtn, { backgroundColor: colors.errorLight }]}
            >
              <MCIcons
                name="trash-can-outline"
                size={16}
                color={colors.error}
              />
            </Button>
          </View>
        </>
      )}
    </Animated.View>
  );
}

export default function TagsCMS() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { data: tags, isLoading } = useGetTagsQuery(null);
  const [createTag, { isLoading: isCreating }] = useCreateTagMutation();
  const [deleteTag] = useDeleteTagMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateForm>({ defaultValues: { name: "" } });

  async function onCreate({ name }: CreateForm) {
    if (!name.trim()) return;
    await createTag({ name: name.trim() }).unwrap();
    reset();
  }

  async function onDelete(id: string) {
    await deleteTag(id).unwrap();
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          data={tags ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.list,
            { backgroundColor: colors.background },
          ]}
          ListHeaderComponent={
            <Animated.View entering={FadeInDown.duration(300)}>
              <Text style={[styles.pageTitle, { color: colors.text }]}>
                {t("cms.tag.title")}
              </Text>

              {/* Create form */}
              <View
                style={[
                  styles.createCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: true, minLength: 1 }}
                  render={({ field: { value, onChange } }) => (
                    <FormInput
                      value={value}
                      onChangeText={onChange}
                      placeholder={t("cms.tag.name")}
                      error={errors.name ? t("cms.tag.name") : undefined}
                      containerStyle={{ marginBottom: 0, flex: 1 }}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onCreate)}
                    />
                  )}
                />
                <Button
                  onPress={handleSubmit(onCreate)}
                  disabled={isCreating}
                  style={[styles.addBtn, { backgroundColor: colors.primary }]}
                >
                  {isCreating ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryForeground}
                    />
                  ) : (
                    <MCIcons
                      name="plus"
                      size={20}
                      color={colors.primaryForeground}
                    />
                  )}
                </Button>
              </View>

              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                {tags?.length ?? 0} {t("cms.tag.title").toLowerCase()}
              </Text>
            </Animated.View>
          }
          renderItem={({ item }) => <TagRow tag={item} onDelete={onDelete} />}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 40 },
  pageTitle: {
    fontSize: 22,
    fontFamily: "LexendBold",
    marginBottom: 16,
  },
  createCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: "LexendRegular",
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagText: {
    fontFamily: "LexendRegular",
    fontSize: 14,
  },
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
