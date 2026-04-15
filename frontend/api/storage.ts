import { Platform } from "react-native";
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
  id: "mmkv.default",
  encryptionKey:
    Platform.OS !== "web" ? process.env.EXPO_PUBLIC_STORAGE_ENC_KEY : undefined,
  encryptionType: "AES-256",
});
