import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ButtonCustom } from "@/components";
import InputForm from "./AdminFormInput";
import { usePublicTheme } from "@/hooks";
import { useSignInMutation } from "@/features/auth";

export default function AdminForm() {
  const [signIn, { isLoading }] = useSignInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = usePublicTheme();

  async function handleSignIn() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setErrorMessage("Enter your email and password.");
      return;
    }

    setErrorMessage("");

    try {
      await signIn({ email: trimmedEmail, password }).unwrap();
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    }
  }

  return (
    <View>
      <Text style={{ color: theme.textSecondary }}>Site administrator</Text>

      <View style={{ height: 10 }} />

      <InputForm
        autoComplete="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        title="Email"
        value={email}
      />
      <View style={{ height: 15 }} />
      <InputForm
        autoComplete="password"
        blurOnSubmit
        onChangeText={setPassword}
        onSubmitEditing={handleSignIn}
        returnKeyType="done"
        secureTextEntry
        textContentType="password"
        title="Password"
        value={password}
      />
      <View style={{ height: 10 }} />
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
            <Text style={{ color: theme.accentContrastText }}>Login</Text>
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
