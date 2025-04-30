import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useGlobalSnackbars } from "@/contexts/SnackbarContext";
import { useCreateBookingMutation } from "@/redux/features/booking";
import {
  Box,
  CenterModal,
  TouchableOpacity,
  Text,
  Button,
} from "@/components/atoms";
import { palette } from "@/theme/elements";
import { Feather } from "@expo/vector-icons";
import { formatDateTime } from "./dateUtils";

type AppointmentModalProps = {
  isVisible: boolean;
  onClose: () => void;
  hospitalName: string;
  serviceName: string;
  hospitalId: string;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isVisible,
  onClose,
  hospitalName,
  serviceName,
  hospitalId,
}) => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const { addSnackbar } = useGlobalSnackbars();

  const handleConfirm = async () => {
    try {
      await createBooking({
        hospital: hospitalId,
        service: serviceName,
        appointmentDate: date,
      }).unwrap();

      addSnackbar({
        message: "Appointment booked successfully!",
        type: "success",
      });
      onClose();
    } catch (error) {
      addSnackbar({
        message: "Failed to book appointment. Please try again.",
        type: "error",
      });
      console.error("Booking error:", error);
    }
  };

  return (
    <CenterModal isVisible={isVisible} onClose={onClose}>
      <Box p="lg" borderRadius="xl">
        <Box alignItems="center" mb="md">
          <TouchableOpacity
            accessibilityLabel="Close modal"
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

        <HospitalServiceInfo
          hospitalName={hospitalName}
          serviceName={serviceName}
        />

        <DatePickerSection
          date={date}
          showDatePicker={showDatePicker}
          onDateChange={setDate}
          onTogglePicker={setShowDatePicker}
        />

        <Button
          label={isLoading ? "Booking..." : "Confirm Appointment"}
          onPress={handleConfirm}
          backgroundColor="primary"
          borderRadius="md"
          paddingVertical="md"
          paddingHorizontal="lg"
          style={{ width: "100%" }}
          variant="buttonWhiteLabel"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </Box>
    </CenterModal>
  );
};

const HospitalServiceInfo = React.memo(
  ({
    hospitalName,
    serviceName,
  }: Pick<AppointmentModalProps, "hospitalName" | "serviceName">) => (
    <Box mb="md">
      <Text variant="p3_medium" mb="xs">
        <Text variant="p3_bold">Hospital:</Text> {hospitalName}
      </Text>
      <Text variant="p3_medium">
        <Text variant="p3_bold">Service:</Text> {serviceName}
      </Text>
      <Box height={1} backgroundColor="grayLight" mb="md" />
    </Box>
  )
);

const DatePickerSection = React.memo(
  ({
    date,
    showDatePicker,
    onDateChange,
    onTogglePicker,
  }: {
    date: Date;
    showDatePicker: boolean;
    onDateChange: (date: Date) => void;
    onTogglePicker: (show: boolean) => void;
  }) => (
    <Box mb="lg">
      <Text variant="p3_bold" mb="xs">
        Select Date & Time
      </Text>
      <TouchableOpacity
        accessible
        accessibilityLabel="Select appointment date"
        onPress={() => onTogglePicker(true)}
      >
        <Box
          borderWidth={1}
          borderColor="primary"
          borderRadius="md"
          p="sm"
          backgroundColor="white"
        >
          <Text variant="p3_medium">{formatDateTime(date)}</Text>
        </Box>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        date={date}
        onConfirm={(selectedDate) => {
          onDateChange(selectedDate);
          onTogglePicker(false);
        }}
        onCancel={() => onTogglePicker(false)}
        minimumDate={new Date()}
      />
    </Box>
  )
);
