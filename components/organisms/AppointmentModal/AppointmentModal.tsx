import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Box, CenterModal, TouchableOpacity } from "@/components/atoms";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { Feather } from "@expo/vector-icons";
import { palette } from "@/theme/elements";

type AppointmentModalProps = {
  isVisible: boolean;
  onClose: () => void;
  hospitalName: string;
  serviceName: string;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isVisible,
  onClose,
  hospitalName,
  serviceName,
}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = () => {
    console.log("Booked:", { hospitalName, serviceName, date });
    onClose();
  };

  return (
    <CenterModal isVisible={isVisible} onClose={onClose}>
      <Box p="lg" borderRadius="xl">
        <Box alignItems="center" mb="md">
          <TouchableOpacity
            backgroundColor="primaryLight2"
            p="sm"
            borderRadius="full"
            mb="xs"
            onPress={onClose}
          >
            <Feather name="x" size={20} color={palette.white} />
          </TouchableOpacity>
          <Text variant="h5">Book Appointment</Text>
        </Box>

        <Box mb="md">
          <Text variant="p3_medium" mb="xs">
            <Text variant="p3_bold">Hospital:</Text> {hospitalName}
          </Text>
          <Text variant="p3_medium">
            <Text variant="p3_bold">Service:</Text> {serviceName}
          </Text>
        </Box>

        <Box height={1} backgroundColor="grayLight" mb="md" />

        <Box mb="lg">
          <Text variant="p3_bold" mb="xs">
            Select Date & Time
          </Text>
          <Box
            borderWidth={1}
            borderColor="primary"
            borderRadius="md"
            p="sm"
            backgroundColor="white"
            onTouchStart={() => setShowDatePicker(true)}
          >
            <Text variant="p3_medium">{date.toLocaleString()}</Text>
          </Box>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="datetime"
            date={date}
            onConfirm={(selectedDate) => {
              setDate(selectedDate);
              setShowDatePicker(false);
            }}
            onCancel={() => setShowDatePicker(false)}
            minimumDate={new Date()}
          />
        </Box>

        {/* Confirm */}
        <Button
          label="Confirm Appointment"
          onPress={handleConfirm}
          backgroundColor="primary"
          borderRadius="md"
          paddingVertical="md"
          paddingHorizontal="lg"
          style={{ width: "100%" }}
          variant="buttonWhiteLabel"
        />
      </Box>
    </CenterModal>
  );
};
