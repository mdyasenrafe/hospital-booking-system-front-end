import React from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  TBookingStatus,
  useGetUserBookingsQuery,
} from "@/redux/features/booking";
import { Box, Screen, Text, LoadingSpinner } from "@/components/atoms";
import { BASE_COLORS, palette } from "@/theme/elements";
import { formatDateTime } from "@/components/organisms/AppointmentModal/dateUtils";

export default function BookingsScreen() {
  const { data, isLoading, isError, refetch, error } =
    useGetUserBookingsQuery();
  console.log(error);
  return (
    <Screen name="Bookings">
      <Box flex={1} p="md">
        <Text variant="h4" mb="md">
          My Appointments
        </Text>

        {isLoading ? (
          <LoadingSpinner size="large" />
        ) : isError ? (
          <Text variant="p3" color="red">
            Failed to load bookings
          </Text>
        ) : (
          <FlatList
            data={data?.data}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            renderItem={({ item }) => (
              <BookingItem
                hospital={item?.hospital?.name}
                service={item.service}
                date={item.appointmentDate as any}
                status={item.status}
              />
            )}
            ListEmptyComponent={
              <Text variant="p3" color="textSecondary" textAlign="center">
                No appointments booked yet
              </Text>
            }
          />
        )}
      </Box>
    </Screen>
  );
}

const BookingItem = React.memo(
  ({
    hospital,
    service,
    date,
    status,
  }: {
    hospital: string;
    service: string;
    date: string;
    status: string;
  }) => (
    <Box
      backgroundColor="white"
      borderRadius="xl"
      mb="md"
      p="md"
      shadowColor="black"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.05}
      shadowRadius={4}
      borderWidth={1}
      borderColor="grayLight"
    >
      <Box flexDirection="row" justifyContent="space-between" mb="xs">
        <Text variant="p3_bold">{hospital}</Text>
        <StatusBadge status={status} />
      </Box>

      <Text variant="p4" color="textDark" mb="xs">
        {service}
      </Text>

      <Text variant="p4" color="textSecondary">
        {formatDateTime(new Date(date))}
      </Text>
    </Box>
  )
);

interface StatusConfigEntry {
  bg: keyof typeof BASE_COLORS;
  text: keyof typeof BASE_COLORS;
}

const statusConfig: Record<TBookingStatus, StatusConfigEntry> = {
  pending: {
    bg: "orangeLight",
    text: "orange",
  },
  confirmed: {
    bg: "greenLight",
    text: "green",
  },
  cancelled: {
    bg: "redLight",
    text: "red",
  },
} as const;

// Then update the StatusBadge component
const StatusBadge = React.memo(({ status }: { status: TBookingStatus }) => {
  const config = statusConfig[status] ?? {
    bg: "grey",
    text: "grey",
  };

  return (
    <Box backgroundColor={config.bg} borderRadius="md" px="sm" py="xs">
      <Text variant="p3_medium" color={config.text} textTransform="capitalize">
        {status}
      </Text>
    </Box>
  );
});
