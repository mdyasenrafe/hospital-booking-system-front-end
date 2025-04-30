import React from "react";
import { Portal, Snackbar as RPSnackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import type { SnackbarMessageType } from "@/contexts/SnackbarContext";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type: SnackbarMessageType;
};

export const Snackbar: React.FC<Props> = ({
  isVisible,
  onClose,
  message,
  type,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <Portal>
      <RPSnackbar
        elevation={5}
        visible={isVisible}
        wrapperStyle={{ top }}
        onDismiss={onClose}
        style={[
          styles.container,
          type === "error" ? styles.error : styles.success,
        ]}
        action={{
          label: "✕",
          onPress: onClose,
        }}
      >
        {message}
      </RPSnackbar>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  error: {
    backgroundColor: "#f44336",
  },
  success: {
    backgroundColor: "#4caf50",
  },
});
