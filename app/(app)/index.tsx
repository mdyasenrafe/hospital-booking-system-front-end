// screens/HomeScreen.tsx
import React from "react";
import { FlatList } from "react-native";
import { useAuth } from "@/hooks";
import { useAppSelector } from "@/redux";
import { useGetHospitalsQuery } from "@/redux/features/hospital/hospitalApi";
import { getCurrentUser } from "@/redux/features/auth";
import { Box, LoadingSpinner, Screen, Text } from "@/components/atoms";
import { AppointmentModal } from "@/components/organisms";
import { Feather } from "@expo/vector-icons";
import { Header, HospitalCard } from "@/components/molecules";
import { THospital } from "@/redux/features/hospital/types";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, error } = useGetHospitalsQuery();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedHospital, setSelectedHospital] = React.useState<{
    hospitalId: string;
    hospitalName: string;
    serviceName: string;
  } | null>(null);

  const handleOpenBooking = (
    hospitalId: string,
    hospitalName: string,
    serviceName: string
  ) => {
    setSelectedHospital({ hospitalId, hospitalName, serviceName });
    setModalVisible(true);
  };

  return (
    <Screen name="Home">
      <Box flex={1} p="md">
        <Header userName={currentUser?.name} onSignOut={signOut} />

        <Text variant="h4" mb="sm">
          Nearby Hospitals
        </Text>

        <HospitalList
          isLoading={isLoading}
          error={error}
          data={data?.data as THospital[]}
          onBookService={handleOpenBooking}
        />

        {selectedHospital && (
          <AppointmentModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            hospitalId={selectedHospital.hospitalId}
            hospitalName={selectedHospital.hospitalName}
            serviceName={selectedHospital.serviceName}
          />
        )}
      </Box>
    </Screen>
  );
}

const HospitalList = React.memo(
  ({
    isLoading,
    error,
    data,
    onBookService,
  }: {
    isLoading: boolean;
    error?: unknown;
    data?: THospital[];
    onBookService: (hospitalId: string, name: string, service: string) => void;
  }) => {
    if (isLoading) return <LoadingSpinner size="large" />;
    if (error) return <ErrorState />;
    if (!data?.length) return <EmptyState />;

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <HospitalCard hospital={item} onBookService={onBookService} />
        )}
      />
    );
  }
);

const ErrorState = () => (
  <Text variant="p3" color="red">
    Failed to load hospitals. Please try again later.
  </Text>
);

const EmptyState = () => (
  <Text variant="p3" color="secondary">
    No hospitals available in your area.
  </Text>
);
