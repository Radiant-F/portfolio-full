import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ButtonCustom } from "@/components";
import InputForm from "./AdminFormInput";
import { usePublicTheme } from "@/hooks";
import { useSignInMutation } from "@/features/auth";
import { useTranslation } from "react-i18next";

export default function AdminForm() {
  const [signIn, { isLoading }] = useSignInMutation();
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = usePublicTheme();
  const { t } = useTranslation();

  async function handleSignIn() {
    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 5 || !passphrase) {
      setErrorMessage(t("settings.login-error-empty"));
      return;
    }

    setErrorMessage("");

    try {
      await signIn({
        username: trimmedUsername,
        passphrase,
      }).unwrap();
    } catch (error) {
      setErrorMessage(t("settings.login-error-invalid"));
    }
  }

  return (
    <View>
      <Text style={{ color: theme.textSecondary }}>
        {t("settings.site-administrator")}
      </Text>

      <View style={{ height: 10 }} />

      <InputForm
        autoCapitalize="none"
        autoComplete="username"
        onChangeText={setUsername}
        title={t("settings.username")}
        value={username}
      />
      <View style={{ height: 15 }} />
      <InputForm
        autoComplete="password"
        blurOnSubmit
        onChangeText={setPassphrase}
        onSubmitEditing={handleSignIn}
        returnKeyType="done"
        secureTextEntry
        textContentType="password"
        title={t("settings.passphrase")}
        value={passphrase}
      />
      <View style={{ height: 10 }} />
      <Text style={{ color: theme.textMuted, fontSize: 12 }}>
        {t("settings.passphrase-hint")}
      </Text>
      <View style={{ height: 6 }} />
      {errorMessage ? (
        <>
          <Text style={{ color: theme.accentContrastText, marginBottom: 10 }}>
            {errorMessage}
          </Text>
        </>
      ) : null}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }} />
        <ButtonCustom
          disabled={isLoading}
          onPress={handleSignIn}
          style={styles.btnLogin}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.accentContrastText} />
          ) : (
            <Text style={{ color: theme.accentContrastText }}>
              {t("settings.login")}
            </Text>
          )}
        </ButtonCustom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogin: {
    height: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
