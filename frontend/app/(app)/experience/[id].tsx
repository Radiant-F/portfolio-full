import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  useGetExperienceQuery,
  useUpdateExperienceMutation,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useUpdateExperienceTranslationMutation,
  useUpdateAchievementTranslationMutation,
} from "@/features/experience";
import type { Achievement } from "@/features/experience/experience";
import {
  Button,
  FormInput,
  ImagePickerInput,
  DateInput,
  DraggableList,
} from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type ExpForm = {
  companyTitle: string;
  position: string;
  responsibility: string;
  sortOrder: string;
};

const LANGS: { key: "ar" | "id" | "cn" | "jp" | "ru"; label: string }[] = [
  { key: "ar", label: "العربية" },
  { key: "id", label: "Bahasa" },
  { key: "cn", label: "中文" },
  { key: "jp", label: "日本語" },
  { key: "ru", label: "Русский" },
];

function AchievementRow({
  item,
  experienceId,
  onDelete,
}: {
  item: Achievement;
  experienceId: string;
  onDelete: (id: string) => void;
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);
  const [editingLang, setEditingLang] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [updateAchievement, { isLoading }] = useUpdateAchievementMutation();
  const [updateTranslation, { isLoading: isSavingTranslation }] =
    useUpdateAchievementTranslationMutation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { description: item.description },
  });

  async function save(values: { description: string }) {
    await updateAchievement({
      experienceId,
      achievementId: item.id,
      body: { description: values.description },
    }).unwrap();
    setIsEditing(false);
  }

  async function saveTranslation(lang: "ar" | "id" | "cn" | "jp" | "ru") {
    await updateTranslation({
      experienceId,
      achievementId: item.id,
      body: { lang, description: editValue },
    }).unwrap();
    setEditingLang(null);
  }

  if (isEditing) {
    return (
      <View style={{ gap: 8 }}>
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <FormInput
              label={t("cms.experience.achievement-description")}
              value={value}
              onChangeText={onChange}
              multiline
              containerStyle={{ marginBottom: 0 }}
            />
          )}
        />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            onPress={handleSubmit(save)}
            style={[
              styles.detailBtn,
              { backgroundColor: colors.primaryLight, flex: 1 },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text
                style={{
                  fontFamily: "LexendBold",
                  fontSize: 13,
                  color: colors.primary,
                }}
              >
                {t("cms.save")}
              </Text>
            )}
          </Button>
          <Button
            onPress={() => {
              setIsEditing(false);
              reset();
            }}
            style={[
              styles.detailBtn,
              { backgroundColor: colors.surfaceAlt, flex: 1 },
            ]}
          >
            <Text
              style={{
                fontFamily: "LexendRegular",
                fontSize: 13,
                color: colors.textSecondary,
              }}
            >
              {t("cms.cancel")}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
        <Text style={{ fontSize: 16, color: colors.primary, marginTop: 1 }}>
          •
        </Text>
        <Text
          style={{
            flex: 1,
            fontFamily: "LexendRegular",
            fontSize: 14,
            color: colors.text,
          }}
        >
          {item.description}
        </Text>
        <Button
          onPress={() => setShowTranslations((v) => !v)}
          style={[
            styles.iconBtn,
            {
              backgroundColor: showTranslations
                ? colors.primaryLight
                : colors.surfaceAlt,
            },
          ]}
        >
          <MCIcons
            name="translate"
            size={14}
            color={showTranslations ? colors.primary : colors.textSecondary}
          />
        </Button>
        <Button
          onPress={() => setIsEditing(true)}
          style={[styles.iconBtn, { backgroundColor: colors.surfaceAlt }]}
        >
          <MCIcons name="pencil" size={14} color={colors.textSecondary} />
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
          <MCIcons name="trash-can-outline" size={14} color={colors.error} />
        </Button>
      </View>
      {showTranslations && (
        <View
          style={[
            styles.translationPanel,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text
            style={{
              fontFamily: "LexendBold",
              fontSize: 12,
              color: colors.textMuted,
              marginBottom: 8,
            }}
          >
            {t("cms.translations")}
          </Text>
          {LANGS.map(({ key, label }) => (
            <View key={key} style={{ marginBottom: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: "LexendBold",
                    fontSize: 12,
                    color: colors.primary,
                    minWidth: 56,
                  }}
                >
                  {label}
                </Text>
                {editingLang !== key && (
                  <Button
                    onPress={() => {
                      setEditingLang(key);
                      setEditValue(item.descriptionI18n?.[key] ?? "");
                    }}
                    style={[
                      styles.iconBtn,
                      {
                        backgroundColor: colors.surfaceAlt,
                        width: 24,
                        height: 24,
                      },
                    ]}
                  >
                    <MCIcons
                      name="pencil"
                      size={12}
                      color={colors.textSecondary}
                    />
                  </Button>
                )}
              </View>
              {editingLang === key ? (
                <View style={{ gap: 6 }}>
                  <FormInput
                    label={t("cms.translation-description")}
                    value={editValue}
                    onChangeText={setEditValue}
                    multiline
                    containerStyle={{ marginBottom: 0 }}
                  />
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <Button
                      onPress={() => saveTranslation(key)}
                      disabled={isSavingTranslation || !editValue.trim()}
                      style={[
                        styles.detailBtn,
                        { backgroundColor: colors.primaryLight, flex: 1 },
                      ]}
                    >
                      {isSavingTranslation ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.primary}
                        />
                      ) : (
                        <Text
                          style={{
                            fontFamily: "LexendBold",
                            fontSize: 12,
                            color: colors.primary,
                          }}
                        >
                          {t("cms.save")}
                        </Text>
                      )}
                    </Button>
                    <Button
                      onPress={() => setEditingLang(null)}
                      style={[
                        styles.detailBtn,
                        { backgroundColor: colors.surfaceAlt, flex: 1 },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "LexendRegular",
                          fontSize: 12,
                          color: colors.textSecondary,
                        }}
                      >
                        {t("cms.cancel")}
                      </Text>
                    </Button>
                  </View>
                </View>
              ) : (
                <Text
                  style={{
                    fontFamily: "LexendRegular",
                    fontSize: 12,
                    color: item.descriptionI18n?.[key]
                      ? colors.text
                      : colors.textMuted,
                  }}
                  numberOfLines={2}
                >
                  {item.descriptionI18n?.[key] || t("cms.no-translation")}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function ExperienceDetail() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: experience, isLoading } = useGetExperienceQuery(id!);
  const [updateExperience, { isLoading: isSaving }] =
    useUpdateExperienceMutation();
  const [updateExperienceTranslation] =
    useUpdateExperienceTranslationMutation();
  const [createAchievement, { isLoading: isCreatingAchievement }] =
    useCreateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [saved, setSaved] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");
  const [showRespTranslations, setShowRespTranslations] = useState(false);
  const [editingRespLang, setEditingRespLang] = useState<string | null>(null);
  const [editRespValue, setEditRespValue] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ExpForm>({
    defaultValues: {
      companyTitle: "",
      position: "",
      responsibility: "",
      sortOrder: "0",
    },
  });

  useEffect(() => {
    if (experience) {
      reset({
        companyTitle: experience.companyTitle,
        position: experience.position,
        responsibility: experience.responsibility,
        sortOrder: String(experience.sortOrder),
      });
      setImageUri(experience.companyLogoUrl);
      setStartDate(new Date(experience.startDate));
      setEndDate(experience.endDate ? new Date(experience.endDate) : null);
      setAchievements(experience.achievements);
    }
  }, [experience]);

  async function onSave(values: ExpForm) {
    const formData = new FormData();
    formData.append("companyTitle", values.companyTitle);
    formData.append("position", values.position);
    formData.append("responsibility", values.responsibility);
    formData.append("sortOrder", values.sortOrder);
    if (startDate) formData.append("startDate", startDate.toISOString());
    if (endDate) formData.append("endDate", endDate.toISOString());
    if (imageFile) formData.append("image", imageFile as any);
    await updateExperience({ id: id!, body: formData }).unwrap();
    setImageFile(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function onAddAchievement() {
    if (!newAchievement.trim()) return;
    await createAchievement({
      experienceId: id!,
      body: { description: newAchievement.trim() },
    }).unwrap();
    setNewAchievement("");
  }

  async function onDeleteAchievement(achievementId: string) {
    await deleteAchievement({ experienceId: id!, achievementId }).unwrap();
  }

  async function onReorderAchievements(newOrder: Achievement[]) {
    setAchievements(newOrder);
    newOrder.forEach((a, index) => {
      if (a.sortOrder !== index) {
        updateAchievement({
          experienceId: id!,
          achievementId: a.id,
          body: { sortOrder: index },
        });
      }
    });
  }

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
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
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.duration(300)}>
            <Button
              onPress={() => router.back()}
              style={[styles.backBtn, { backgroundColor: colors.surfaceAlt }]}
            >
              <MCIcons
                name="arrow-left"
                size={18}
                color={colors.textSecondary}
              />
              <Text style={[styles.backText, { color: colors.textSecondary }]}>
                {t("cms.experience.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.edit")}
            </Text>

            <ImagePickerInput
              label={t("cms.experience.company") + " Logo"}
              value={imageUri}
              onChange={(uri, file) => {
                setImageUri(uri);
                setImageFile(file);
              }}
            />

            <Controller
              control={control}
              name="companyTitle"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.experience.company")}
                  value={value}
                  onChangeText={onChange}
                  error={
                    errors.companyTitle
                      ? t("cms.experience.company")
                      : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="position"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.experience.position")}
                  value={value}
                  onChangeText={onChange}
                  error={
                    errors.position ? t("cms.experience.position") : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="responsibility"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.experience.responsibility")}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  error={
                    errors.responsibility
                      ? t("cms.experience.responsibility")
                      : undefined
                  }
                />
              )}
            />

            <DateInput
              label={t("cms.experience.start-date")}
              value={startDate}
              onChange={setStartDate}
              maximumDate={new Date()}
            />

            <DateInput
              label={t("cms.experience.end-date")}
              value={endDate}
              onChange={setEndDate}
              nullable
              nullLabel={t("cms.experience.present")}
              maximumDate={new Date()}
            />

            <Controller
              control={control}
              name="sortOrder"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.sort-order")}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSave)}
              disabled={isSaving || (!isDirty && !imageFile)}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: saved
                    ? colors.success
                    : isSaving || (!isDirty && !imageFile)
                      ? colors.surfaceAlt
                      : colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.saveBtnText,
                  {
                    color:
                      isSaving || (!isDirty && !imageFile)
                        ? colors.textMuted
                        : colors.primaryForeground,
                  },
                ]}
              >
                {isSaving ? t("cms.saving") : saved ? "✓ Saved" : t("cms.save")}
              </Text>
            </Button>

            {/* Responsibility Translations */}
            <View style={[styles.sectionHeader, { marginTop: 4 }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("cms.translations")}
              </Text>
              <Button
                onPress={() => setShowRespTranslations((v) => !v)}
                style={[
                  styles.iconBtn,
                  {
                    backgroundColor: showRespTranslations
                      ? colors.primaryLight
                      : colors.surfaceAlt,
                  },
                ]}
              >
                <MCIcons
                  name="translate"
                  size={16}
                  color={
                    showRespTranslations ? colors.primary : colors.textSecondary
                  }
                />
              </Button>
            </View>

            {showRespTranslations && experience && (
              <View
                style={[
                  styles.addCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "LexendRegular",
                    fontSize: 12,
                    color: colors.textMuted,
                    marginBottom: 10,
                  }}
                >
                  {t("cms.experience.responsibility")}
                </Text>
                {LANGS.map(({ key, label }) => (
                  <View key={key} style={{ marginBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "LexendBold",
                          fontSize: 13,
                          color: colors.primary,
                          minWidth: 60,
                        }}
                      >
                        {label}
                      </Text>
                      {editingRespLang !== key && (
                        <Button
                          onPress={() => {
                            setEditingRespLang(key);
                            setEditRespValue(
                              experience.responsibilityI18n?.[key] ?? "",
                            );
                          }}
                          style={[
                            styles.iconBtn,
                            { backgroundColor: colors.surfaceAlt },
                          ]}
                        >
                          <MCIcons
                            name="pencil"
                            size={13}
                            color={colors.textSecondary}
                          />
                        </Button>
                      )}
                    </View>
                    {editingRespLang === key ? (
                      <View style={{ gap: 6 }}>
                        <FormInput
                          label={t("cms.translation-description")}
                          value={editRespValue}
                          onChangeText={setEditRespValue}
                          multiline
                          containerStyle={{ marginBottom: 0 }}
                        />
                        <View style={{ flexDirection: "row", gap: 8 }}>
                          <Button
                            onPress={async () => {
                              await updateExperienceTranslation({
                                experienceId: id!,
                                body: {
                                  lang: key,
                                  responsibility: editRespValue,
                                },
                              }).unwrap();
                              setEditingRespLang(null);
                            }}
                            disabled={!editRespValue.trim()}
                            style={[
                              styles.detailBtn,
                              { backgroundColor: colors.primaryLight, flex: 1 },
                            ]}
                          >
                            <Text
                              style={{
                                fontFamily: "LexendBold",
                                fontSize: 13,
                                color: colors.primary,
                              }}
                            >
                              {t("cms.save")}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => setEditingRespLang(null)}
                            style={[
                              styles.detailBtn,
                              { backgroundColor: colors.surfaceAlt, flex: 1 },
                            ]}
                          >
                            <Text
                              style={{
                                fontFamily: "LexendRegular",
                                fontSize: 13,
                                color: colors.textSecondary,
                              }}
                            >
                              {t("cms.cancel")}
                            </Text>
                          </Button>
                        </View>
                      </View>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "LexendRegular",
                          fontSize: 13,
                          color: experience.responsibilityI18n?.[key]
                            ? colors.text
                            : colors.textMuted,
                        }}
                        numberOfLines={2}
                      >
                        {experience.responsibilityI18n?.[key] ||
                          t("cms.no-translation")}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("cms.experience.achievements")}
              </Text>
            </View>

            <View
              style={[
                styles.addCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <FormInput
                label={t("cms.experience.achievement-description")}
                value={newAchievement}
                onChangeText={setNewAchievement}
                multiline
                containerStyle={{ marginBottom: 8 }}
              />
              <Button
                onPress={onAddAchievement}
                disabled={isCreatingAchievement || !newAchievement.trim()}
                style={[
                  styles.addBtn,
                  {
                    backgroundColor:
                      isCreatingAchievement || !newAchievement.trim()
                        ? colors.surfaceAlt
                        : colors.primary,
                  },
                ]}
              >
                {isCreatingAchievement ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.primaryForeground}
                  />
                ) : (
                  <>
                    <MCIcons
                      name="plus"
                      size={16}
                      color={colors.primaryForeground}
                    />
                    <Text
                      style={{
                        fontFamily: "LexendBold",
                        fontSize: 13,
                        color: colors.primaryForeground,
                      }}
                    >
                      {t("cms.experience.add-achievement")}
                    </Text>
                  </>
                )}
              </Button>
            </View>

            {achievements.length > 0 ? (
              <DraggableList
                data={achievements}
                onReorder={onReorderAchievements}
                renderItem={(item) => (
                  <AchievementRow
                    item={item}
                    experienceId={id!}
                    onDelete={onDeleteAchievement}
                  />
                )}
              />
            ) : (
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("cms.experience.no-achievements")}
              </Text>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scroll: { padding: 20, paddingBottom: 40 },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backText: { fontFamily: "LexendRegular", fontSize: 14 },
  pageTitle: { fontSize: 22, fontFamily: "LexendBold", marginBottom: 20 },
  saveBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 28,
  },
  saveBtnText: { fontFamily: "LexendBold", fontSize: 15 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontFamily: "LexendBold" },
  addCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16 },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  detailBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "LexendRegular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
  translationPanel: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
});
