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
  useGetSkillQuery,
  useUpdateSkillMutation,
  useCreateSkillDetailMutation,
  useUpdateSkillDetailMutation,
  useDeleteSkillDetailMutation,
} from "@/features/skill";
import type { SkillDetail } from "@/features/skill/skill";
import {
  Button,
  FormInput,
  ImagePickerInput,
  DraggableList,
} from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type SkillForm = { title: string; sortOrder: string };
type DetailForm = { name: string; description: string };

function DetailRow({
  detail,
  skillId,
  onDelete,
}: {
  detail: SkillDetail;
  skillId: string;
  onDelete: (id: string) => void;
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [updateDetail, { isLoading }] = useUpdateSkillDetailMutation();
  const { control, handleSubmit, reset } = useForm<DetailForm>({
    defaultValues: { name: detail.name, description: detail.description },
  });

  async function save(values: DetailForm) {
    await updateDetail({
      skillId,
      detailId: detail.id,
      body: { name: values.name, description: values.description },
    }).unwrap();
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <View style={{ gap: 8 }}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <FormInput
              label={t("cms.skill.detail-name")}
              value={value}
              onChangeText={onChange}
              containerStyle={{ marginBottom: 0 }}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <FormInput
              label={t("cms.skill.detail-description")}
              value={value}
              onChangeText={onChange}
              multiline
              containerStyle={{ marginBottom: 0 }}
            />
          )}
        />
        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          <Button
            onPress={handleSubmit(save)}
            style={[
              styles.detailActionBtn,
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
              styles.detailActionBtn,
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
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: "LexendBold", fontSize: 14, color: colors.text }}
        >
          {detail.name}
        </Text>
        <Text
          style={{
            fontFamily: "LexendRegular",
            fontSize: 13,
            color: colors.textSecondary,
            marginTop: 2,
          }}
        >
          {detail.description}
        </Text>
      </View>
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
              onPress: () => onDelete(detail.id),
            },
          ])
        }
        style={[styles.iconBtn, { backgroundColor: colors.errorLight }]}
      >
        <MCIcons name="trash-can-outline" size={14} color={colors.error} />
      </Button>
    </View>
  );
}

export default function SkillDetail() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: skill, isLoading } = useGetSkillQuery(id!);
  const [updateSkill, { isLoading: isSaving }] = useUpdateSkillMutation();
  const [createDetail, { isLoading: isCreatingDetail }] =
    useCreateSkillDetailMutation();
  const [deleteDetail] = useDeleteSkillDetailMutation();
  const [updateDetail] = useUpdateSkillDetailMutation();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [details, setDetails] = useState<SkillDetail[]>([]);
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SkillForm>({ defaultValues: { title: "", sortOrder: "0" } });

  const {
    control: detailControl,
    handleSubmit: handleDetailSubmit,
    reset: resetDetail,
    formState: { errors: detailErrors },
  } = useForm<DetailForm>({ defaultValues: { name: "", description: "" } });

  useEffect(() => {
    if (skill) {
      reset({ title: skill.title, sortOrder: String(skill.sortOrder) });
      setImageUri(skill.imageUrl);
      setDetails(skill.details);
    }
  }, [skill]);

  async function onSaveSkill(values: SkillForm) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("sortOrder", values.sortOrder);
    if (imageFile) {
      formData.append("image", imageFile as any);
    }
    await updateSkill({ id: id!, body: formData }).unwrap();
    setImageFile(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function onAddDetail(values: DetailForm) {
    await createDetail({
      skillId: id!,
      body: { name: values.name, description: values.description },
    }).unwrap();
    resetDetail();
  }

  async function onDeleteDetail(detailId: string) {
    await deleteDetail({ skillId: id!, detailId }).unwrap();
  }

  async function onReorderDetails(newDetails: SkillDetail[]) {
    setDetails(newDetails);
    // Fire individual updates for each changed sortOrder
    newDetails.forEach((d, index) => {
      if (d.sortOrder !== index) {
        updateDetail({
          skillId: id!,
          detailId: d.id,
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
                {t("cms.skill.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.edit")}
            </Text>

            {/* Skill form */}
            <ImagePickerInput
              label={t("cms.skill.name")}
              value={imageUri}
              onChange={(uri, file) => {
                setImageUri(uri);
                setImageFile(file);
              }}
            />

            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.skill.name")}
                  value={value}
                  onChangeText={onChange}
                  error={errors.title ? t("cms.skill.name") : undefined}
                />
              )}
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
              onPress={handleSubmit(onSaveSkill)}
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

            {/* Details section */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("cms.skill.details")}
              </Text>
              <Text style={[styles.sectionCount, { color: colors.textMuted }]}>
                {details.length}
              </Text>
            </View>

            {/* Add detail form */}
            <View
              style={[
                styles.addDetailCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Controller
                control={detailControl}
                name="name"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormInput
                    label={t("cms.skill.detail-name")}
                    value={value}
                    onChangeText={onChange}
                    error={
                      detailErrors.name ? t("cms.skill.detail-name") : undefined
                    }
                    containerStyle={{ marginBottom: 8 }}
                  />
                )}
              />
              <Controller
                control={detailControl}
                name="description"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormInput
                    label={t("cms.skill.detail-description")}
                    value={value}
                    onChangeText={onChange}
                    multiline
                    error={
                      detailErrors.description
                        ? t("cms.skill.detail-description")
                        : undefined
                    }
                    containerStyle={{ marginBottom: 8 }}
                  />
                )}
              />
              <Button
                onPress={handleDetailSubmit(onAddDetail)}
                disabled={isCreatingDetail}
                style={[
                  styles.addDetailBtn,
                  { backgroundColor: colors.primary },
                ]}
              >
                {isCreatingDetail ? (
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
                      {t("cms.skill.add-detail")}
                    </Text>
                  </>
                )}
              </Button>
            </View>

            {/* Draggable details list */}
            {details.length > 0 ? (
              <DraggableList
                data={details}
                onReorder={onReorderDetails}
                renderItem={(item) => (
                  <DetailRow
                    detail={item}
                    skillId={id!}
                    onDelete={onDeleteDetail}
                  />
                )}
              />
            ) : (
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("cms.skill.no-details")}
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
  sectionCount: {
    fontSize: 13,
    fontFamily: "LexendRegular",
    backgroundColor: "transparent",
  },
  addDetailCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  addDetailBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  detailActionBtn: {
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
});
