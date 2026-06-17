import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonCustom } from "@/components";
import InputForm from "./AdminFormInput";

export default function AdminForm() {
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");

  return (
    <View>
      <Text style={{ color: "rgb(172, 193, 210)" }}>
        Site administrator access requires login.
      </Text>

      <View style={{ height: 20 }} />

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
          <Text style={{ color: "rgb(158, 213, 255)" }}>Login</Text>
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
