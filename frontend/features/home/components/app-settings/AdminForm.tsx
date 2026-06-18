import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonCustom } from "@/components";
import InputForm from "./AdminFormInput";
import { usePublicTheme } from "@/hooks";

export default function AdminForm() {
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const theme = usePublicTheme();

  return (
    <View>
      <Text style={{ color: theme.textSecondary }}>Site administrator</Text>

      <View style={{ height: 10 }} />

      <InputForm onChangeText={setUsername} title="Username" value={username} />
      <View style={{ height: 15 }} />
      <InputForm
        onChangeText={setPassphrase}
        title="Passphrase"
        value={passphrase}
      />
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }} />
        <ButtonCustom style={styles.btnLogin}>
          <Text style={{ color: theme.accentContrastText }}>Login</Text>
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
