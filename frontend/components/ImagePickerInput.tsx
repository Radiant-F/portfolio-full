import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { useTranslation } from "react-i18next";
import Button from "./Button";

type ImagePickerInputProps = {
  value?: string | null;
  onChange: (
    uri: string,
    file: { uri: string; name: string; type: string },
  ) => void;
  onClear?: () => void;
  label?: string;
  error?: string;
  aspectRatio?: [number, number];
  maxSizeMB?: number;
};

export default function ImagePickerInput({
  value,
  onChange,
  onClear,
  label,
  error,
  aspectRatio = [1, 1],
  maxSizeMB = 2,
}: ImagePickerInputProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  async function pick() {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: aspectRatio,
        quality: 0.85,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const ext = asset.uri.split(".").pop() ?? "jpg";
        const name = `upload_${Date.now()}.${ext}`;
        const type = `image/${ext === "jpg" ? "jpeg" : ext}`;
        onChange(asset.uri, { uri: asset.uri, name, type });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ marginBottom: 16 }}>
      {label ? (
        <Text
          style={{
            fontSize: 13,
            fontFamily: "LexendRegular",
            color: error ? colors.error : colors.textSecondary,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}

      <Pressable onPress={pick}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.inputBackground,
              borderColor: error ? colors.error : colors.inputBorder,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : value ? (
            <>
              <Image
                source={{ uri: value }}
                style={styles.preview}
                contentFit="cover"
              />
              <View
                style={[styles.overlay, { backgroundColor: colors.overlay }]}
              >
                <MCIcons name="pencil" size={20} color="#fff" />
              </View>
            </>
          ) : (
            <View style={styles.placeholder}>
              <MCIcons name="image-plus" size={28} color={colors.textMuted} />
              <Text
                style={{
                  fontFamily: "LexendRegular",
                  fontSize: 12,
                  color: colors.textMuted,
                  marginTop: 6,
                }}
              >
                {t("cms.add")}
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      {value && onClear ? (
        <Button
          onPress={onClear}
          style={[styles.clearBtn, { backgroundColor: colors.errorLight }]}
        >
          <Text
            style={{
              fontFamily: "LexendRegular",
              fontSize: 12,
              color: colors.error,
            }}
          >
            {t("cms.delete")}
          </Text>
        </Button>
      ) : null}

      {error ? (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "LexendRegular",
            color: colors.error,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtn: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});
