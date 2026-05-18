import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";

type DateInputProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  nullable?: boolean;
  nullLabel?: string;
  maximumDate?: Date;
  minimumDate?: Date;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DateInput({
  value,
  onChange,
  label,
  error,
  placeholder = "Select date",
  nullable = false,
  nullLabel = "Present",
  maximumDate,
  minimumDate,
}: DateInputProps) {
  const { colors } = useTheme();
  const [show, setShow] = useState(false);
  const [isNull, setIsNull] = useState(value === null && nullable);

  const handleChange = (_: any, selected?: Date) => {
    if (Platform.OS === "android") setShow(false);
    if (selected) {
      setIsNull(false);
      onChange(selected);
    }
  };

  const displayText = isNull
    ? nullLabel
    : value
      ? formatDate(value)
      : placeholder;

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

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => setShow(true)}
          style={[
            styles.trigger,
            {
              backgroundColor: colors.inputBackground,
              borderColor: error ? colors.error : colors.inputBorder,
              flex: 1,
            },
          ]}
        >
          <MCIcons name="calendar" size={18} color={colors.textSecondary} />
          <Text
            style={{
              fontFamily: "LexendRegular",
              fontSize: 15,
              color: value || isNull ? colors.text : colors.textMuted,
              marginLeft: 8,
            }}
          >
            {displayText}
          </Text>
        </Pressable>

        {nullable && (
          <Pressable
            onPress={() => {
              setIsNull(!isNull);
              if (!isNull) onChange(null);
              else onChange(new Date());
            }}
            style={[
              styles.nullToggle,
              {
                backgroundColor: isNull
                  ? colors.primaryLight
                  : colors.surfaceAlt,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "LexendRegular",
                fontSize: 13,
                color: isNull ? colors.primary : colors.textSecondary,
              }}
            >
              {nullLabel}
            </Text>
          </Pressable>
        )}
      </View>

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

      {/* iOS modal picker */}
      {Platform.OS === "ios" && show && (
        <Modal transparent animationType="slide">
          <Pressable
            style={[styles.modalBackdrop, { backgroundColor: colors.overlay }]}
            onPress={() => setShow(false)}
          />
          <View style={[styles.iosSheet, { backgroundColor: colors.card }]}>
            <Pressable onPress={() => setShow(false)} style={styles.iosDone}>
              <Text
                style={{
                  fontFamily: "LexendBold",
                  color: colors.primary,
                  fontSize: 16,
                }}
              >
                Done
              </Text>
            </Pressable>
            <DateTimePicker
              value={value ?? new Date()}
              mode="date"
              display="spinner"
              onChange={handleChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          </View>
        </Modal>
      )}

      {/* Android native picker */}
      {Platform.OS === "android" && show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}

      {/* Web fallback (basic input) */}
      {Platform.OS === "web" && show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  nullToggle: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
  },
  iosSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  iosDone: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
});
