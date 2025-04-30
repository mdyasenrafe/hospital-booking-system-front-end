import React, { useState } from "react";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/hooks";
import { Text } from "@/components/atoms/Text";
import { useGetHospitalsQuery } from "@/redux/features/hospital/hospitalApi";
import { Box, LoadingSpinner, Screen } from "@/components/atoms";
import { AppointmentModal } from "@/components/organisms";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";

export default function Home() {
  const { signOut } = useAuth();
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, error } = useGetHospitalsQuery();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<{
    hospitalId: string;
    hospitalName: string;
    serviceName: string;
  } | null>(null);

  const openBookingModal = (
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
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb="md"
        >
          <Box flexDirection="row" alignItems="center">
            <Feather
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 8 }}
            />
            <Text variant="p2_medium">Welcome, {currentUser?.name}</Text>
          </Box>
          <Text
            onPress={signOut}
            variant="p4_primary"
            style={{ textDecorationLine: "underline" }}
          >
            Sign Out
          </Text>
        </Box>

        <Text variant="h4" mb="sm">
          Nearby Hospitals
        </Text>

        {/* Hospital List */}
        {isLoading ? (
          <LoadingSpinner size="large" />
        ) : error ? (
          <Text variant="p3" color="red">
            Failed to load hospitals
          </Text>
        ) : (
          <FlatList
            data={data?.data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
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
                <Text variant="p3_bold" mb="xs">
                  {item.name}
                </Text>
                <Text variant="p4" color="textDark" mb="sm">
                  {item.address}
                </Text>

                <Box flexDirection="row" flexWrap="wrap" gap="xs">
                  {item.services.map((service, idx) => (
                    <Box
                      key={idx}
                      backgroundColor="primary"
                      borderRadius="md"
                      px="sm"
                      py="xs"
                      mr="xs"
                      mt="xs"
                    >
                      <Text
                        variant="p4_white"
                        onPress={() =>
                          openBookingModal(item._id, item.name, service)
                        }
                      >
                        Book: {service}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          />
        )}
      </Box>
      {selectedHospital && (
        <AppointmentModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          hospitalId={selectedHospital.hospitalId}
          hospitalName={selectedHospital.hospitalName}
          serviceName={selectedHospital.serviceName}
        />
      )}
    </Screen>
  );
}
