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
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  useGetWorkQuery,
  useUpdateWorkMutation,
  useCreateWorkLinkMutation,
  useUpdateWorkLinkMutation,
  useDeleteWorkLinkMutation,
  useCreateWorkScreenshotMutation,
  useDeleteWorkScreenshotMutation,
  useAttachWorkTagMutation,
  useDetachWorkTagMutation,
} from "@/features/work";
import { useGetTagsQuery } from "@/features/tag";
import type { WorkLink, WorkScreenshot, WorkTag } from "@/features/work/work";
import {
  Button,
  FormInput,
  ImagePickerInput,
  DraggableList,
} from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type WorkForm = { title: string; description: string; sortOrder: string };
type LinkForm = { label: string; url: string };

// ─── Link row ────────────────────────────────────────────────────────────────
function LinkRow({
  link,
  workId,
  onDelete,
}: {
  link: WorkLink;
  workId: string;
  onDelete: (id: string) => void;
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [updateLink, { isLoading }] = useUpdateWorkLinkMutation();
  const { control, handleSubmit, reset } = useForm<LinkForm>({
    defaultValues: { label: link.label, url: link.url },
  });

  async function save(v: LinkForm) {
    await updateLink({
      workId,
      linkId: link.id,
      body: { label: v.label, url: v.url },
    }).unwrap();
    setEditing(false);
  }

  if (editing) {
    return (
      <View style={{ gap: 8 }}>
        <Controller
          control={control}
          name="label"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <FormInput
              label={t("cms.work.link-label")}
              value={value}
              onChangeText={onChange}
              containerStyle={{ marginBottom: 0 }}
            />
          )}
        />
        <Controller
          control={control}
          name="url"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <FormInput
              label={t("cms.work.link-url")}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="url"
              containerStyle={{ marginBottom: 0 }}
            />
          )}
        />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            onPress={handleSubmit(save)}
            style={[
              styles.subBtn,
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
              setEditing(false);
              reset();
            }}
            style={[
              styles.subBtn,
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
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <MCIcons name="link-variant" size={16} color={colors.primary} />
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: "LexendBold", fontSize: 14, color: colors.text }}
        >
          {link.label}
        </Text>
        <Text
          style={{
            fontFamily: "LexendRegular",
            fontSize: 12,
            color: colors.textSecondary,
          }}
          numberOfLines={1}
        >
          {link.url}
        </Text>
      </View>
      <Button
        onPress={() => setEditing(true)}
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
              onPress: () => onDelete(link.id),
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

// ─── Tag chip ─────────────────────────────────────────────────────────────────
function TagChip({
  tag,
  attached,
  onToggle,
}: {
  tag: { id: string; name: string };
  attached: boolean;
  onToggle: (id: string, attached: boolean) => void;
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onToggle(tag.id, attached)}
      style={[
        styles.chip,
        {
          backgroundColor: attached ? colors.primary : colors.surfaceAlt,
          borderColor: attached ? colors.primary : colors.border,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "LexendRegular",
          fontSize: 13,
          color: attached ? colors.primaryForeground : colors.textSecondary,
        }}
      >
        {tag.name}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function WorkDetail() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: work, isLoading } = useGetWorkQuery(id!);
  const { data: allTags } = useGetTagsQuery(null);

  const [updateWork, { isLoading: isSaving }] = useUpdateWorkMutation();
  const [createLink, { isLoading: isCreatingLink }] =
    useCreateWorkLinkMutation();
  const [deleteLink] = useDeleteWorkLinkMutation();
  const [createScreenshot, { isLoading: isUploadingScreenshot }] =
    useCreateWorkScreenshotMutation();
  const [deleteScreenshot] = useDeleteWorkScreenshotMutation();
  const [attachTag] = useAttachWorkTagMutation();
  const [detachTag] = useDetachWorkTagMutation();

  const [iconUri, setIconUri] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [links, setLinks] = useState<WorkLink[]>([]);
  const [screenshots, setScreenshots] = useState<WorkScreenshot[]>([]);
  const [attachedTagIds, setAttachedTagIds] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<WorkForm>({
    defaultValues: { title: "", description: "", sortOrder: "0" },
  });

  const {
    control: linkControl,
    handleSubmit: handleLinkSubmit,
    reset: resetLink,
    formState: { errors: linkErrors },
  } = useForm<LinkForm>({ defaultValues: { label: "", url: "" } });

  useEffect(() => {
    if (work) {
      reset({
        title: work.title,
        description: work.description,
        sortOrder: String(work.sortOrder),
      });
      setIconUri(work.iconUrl);
      setLinks(work.links);
      setScreenshots(work.screenshots);
      setAttachedTagIds(new Set(work.tags.map((t) => t.id)));
    }
  }, [work]);

  async function onSaveWork(values: WorkForm) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("sortOrder", values.sortOrder);
    if (iconFile) formData.append("icon", iconFile as any);
    await updateWork({ id: id!, body: formData }).unwrap();
    setIconFile(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function onAddLink(values: LinkForm) {
    await createLink({
      workId: id!,
      body: { label: values.label, url: values.url },
    }).unwrap();
    resetLink();
  }

  async function onDeleteLink(linkId: string) {
    await deleteLink({ workId: id!, linkId }).unwrap();
  }

  async function onPickScreenshot() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.85,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    const formData = new FormData();
    const ext = asset.uri.split(".").pop() ?? "jpg";
    formData.append("image", {
      uri: asset.uri,
      name: `screenshot.${ext}`,
      type: `image/${ext}`,
    } as any);
    await createScreenshot({ workId: id!, body: formData }).unwrap();
  }

  async function onDeleteScreenshot(screenshotId: string) {
    Alert.alert(t("cms.confirm"), t("cms.confirm-delete"), [
      { text: t("cms.cancel"), style: "cancel" },
      {
        text: t("cms.delete"),
        style: "destructive",
        onPress: () => deleteScreenshot({ workId: id!, screenshotId }),
      },
    ]);
  }

  async function onToggleTag(tagId: string, currentlyAttached: boolean) {
    if (currentlyAttached) {
      await detachTag({ workId: id!, tagId }).unwrap();
      setAttachedTagIds((prev) => {
        const next = new Set(prev);
        next.delete(tagId);
        return next;
      });
    } else {
      await attachTag({ workId: id!, body: { tagId } }).unwrap();
      setAttachedTagIds((prev) => new Set([...prev, tagId]));
    }
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
            {/* Back */}
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
                {t("cms.work.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.edit")}
            </Text>

            {/* ── Section 1: Work form ── */}
            <ImagePickerInput
              label="Icon"
              value={iconUri}
              onChange={(uri, file) => {
                setIconUri(uri);
                setIconFile(file);
              }}
            />

            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.work.title")}
                  value={value}
                  onChangeText={onChange}
                  error={errors.title ? t("cms.work.title") : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.work.description")}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  error={
                    errors.description ? t("cms.work.description") : undefined
                  }
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
              onPress={handleSubmit(onSaveWork)}
              disabled={isSaving || (!isDirty && !iconFile)}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: saved
                    ? colors.success
                    : isSaving || (!isDirty && !iconFile)
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
                      isSaving || (!isDirty && !iconFile)
                        ? colors.textMuted
                        : colors.primaryForeground,
                  },
                ]}
              >
                {isSaving ? t("cms.saving") : saved ? "✓ Saved" : t("cms.save")}
              </Text>
            </Button>

            {/* ── Section 2: Links ── */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("cms.work.links")}
              </Text>
            </View>

            <View
              style={[
                styles.addCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Controller
                control={linkControl}
                name="label"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormInput
                    label={t("cms.work.link-label")}
                    value={value}
                    onChangeText={onChange}
                    error={
                      linkErrors.label ? t("cms.work.link-label") : undefined
                    }
                    containerStyle={{ marginBottom: 8 }}
                  />
                )}
              />
              <Controller
                control={linkControl}
                name="url"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormInput
                    label={t("cms.work.link-url")}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="url"
                    error={linkErrors.url ? t("cms.work.link-url") : undefined}
                    containerStyle={{ marginBottom: 8 }}
                  />
                )}
              />
              <Button
                onPress={handleLinkSubmit(onAddLink)}
                disabled={isCreatingLink}
                style={[
                  styles.addBtn,
                  {
                    backgroundColor: isCreatingLink
                      ? colors.surfaceAlt
                      : colors.primary,
                  },
                ]}
              >
                {isCreatingLink ? (
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
                      {t("cms.work.add-link")}
                    </Text>
                  </>
                )}
              </Button>
            </View>

            {links.length > 0 ? (
              <DraggableList
                data={links}
                onReorder={setLinks}
                renderItem={(link) => (
                  <LinkRow link={link} workId={id!} onDelete={onDeleteLink} />
                )}
              />
            ) : (
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("cms.work.no-links")}
              </Text>
            )}

            {/* ── Section 3: Screenshots ── */}
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("cms.work.screenshots")}
              </Text>
            </View>

            <Button
              onPress={onPickScreenshot}
              disabled={isUploadingScreenshot}
              style={[
                styles.addBtn,
                {
                  backgroundColor: isUploadingScreenshot
                    ? colors.surfaceAlt
                    : colors.primary,
                  marginBottom: 12,
                },
              ]}
            >
              {isUploadingScreenshot ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primaryForeground}
                />
              ) : (
                <>
                  <MCIcons
                    name="image-plus"
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
                    {t("cms.work.add-screenshot")}
                  </Text>
                </>
              )}
            </Button>

            {screenshots.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 8 }}
              >
                {screenshots.map((ss) => (
                  <Animated.View
                    key={ss.id}
                    exiting={FadeOut.duration(200)}
                    style={styles.screenshotWrap}
                  >
                    <Image
                      source={{ uri: ss.imageUrl }}
                      style={styles.screenshot}
                      contentFit="cover"
                    />
                    <Button
                      onPress={() => onDeleteScreenshot(ss.id)}
                      style={[
                        styles.ssDeleteBtn,
                        { backgroundColor: colors.error },
                      ]}
                    >
                      <MCIcons name="close" size={12} color="#fff" />
                    </Button>
                  </Animated.View>
                ))}
              </ScrollView>
            ) : (
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("cms.work.no-screenshots")}
              </Text>
            )}

            {/* ── Section 4: Tags ── */}
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("cms.work.tags")}
              </Text>
            </View>

            {allTags && allTags.length > 0 ? (
              <View style={styles.chipRow}>
                {allTags.map((tag) => (
                  <TagChip
                    key={tag.id}
                    tag={tag}
                    attached={attachedTagIds.has(tag.id)}
                    onToggle={onToggleTag}
                  />
                ))}
              </View>
            ) : (
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("cms.work.no-tags")}
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
  subBtn: {
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
    marginVertical: 12,
  },
  screenshotWrap: {
    position: "relative",
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  screenshot: {
    width: 120,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  ssDeleteBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
});
