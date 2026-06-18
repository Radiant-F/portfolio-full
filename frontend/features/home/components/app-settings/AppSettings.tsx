import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ButtonCustom, ModalCustom } from "@/components";
import AdminForm from "./AdminForm";
import LanguagePicker from "./LanguagePicker";
import Theme from "./Theme";

export default function AppSettings() {
  const [modalMounted, setModalMounted] = useState(false);

  function openModal() {
    setModalMounted(true);
  }

  function closeModal() {
    setModalMounted(false);
  }

  return (
    <View>
      <ButtonCustom style={styles.btnDrawer} onPress={openModal}>
        <MCIcons name="cog" color={"rgb(172, 193, 210)"} size={20} />
      </ButtonCustom>

      <ModalCustom
        visible={modalMounted}
        onClose={closeModal}
        title="Settings"
        iconHeaderInfoStart="cog"
        maxWidth={420}
      >
        <View style={{ padding: 20, gap: 20 }}>
          <Theme />
          <LanguagePicker />
          <AdminForm />
        </View>
      </ModalCustom>
    </View>
  );
}

const styles = StyleSheet.create({
  btnDrawer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
