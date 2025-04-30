import { Modal, Portal } from "react-native-paper";
import { memo } from "react";
import { StyleSheet } from "react-native";

export type BaseModal = {
  isVisible: boolean;
  onClose: () => void;
};

type RequiredWithPartial<T, K extends keyof T> = Required<
  Pick<T, Exclude<keyof T, K>>
> &
  Partial<Pick<T, Extract<keyof T, K>>>;

type CenterModalProps = {
  children?: React.ReactNode;
} & RequiredWithPartial<BaseModal, "onClose">;
export const CenterModal = memo(
  ({ isVisible, onClose, children }: CenterModalProps) => {
    return (
      <Portal>
        <Modal
          contentContainerStyle={[
            styles.centerModal,
            { backgroundColor: "white" },
          ]}
          visible={isVisible}
          onDismiss={onClose}
        >
          {children}
        </Modal>
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  centerModal: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    minHeight: 200,
  },
});

CenterModal.displayName = "CenterModal";
