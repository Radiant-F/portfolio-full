import { Platform } from "react-native";
import { createMMKV } from "react-native-mmkv";
import "react-native-get-random-values";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidV4 } from "uuid";

function checkEncryptionKey() {
  let encKey = SecureStore.getItem("mmkv.encryption.key");

  if (!encKey) {
    encKey = uuidV4();
    SecureStore.setItem("mmkv.encryption.key", encKey);
  }

  return encKey;
}

export const storage = createMMKV({
  id: "mmkv.default",
  encryptionKey: Platform.OS !== "web" ? checkEncryptionKey() : undefined,
  encryptionType: "AES-256",
});
