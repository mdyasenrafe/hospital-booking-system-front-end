import React from "react";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/hooks";
import { Text } from "@/components/atoms/Text";
import { useGetHospitalsQuery } from "@/redux/features/hospital/hospitalApi";
import { Box, Screen } from "@/components/atoms";

const dummyUserName = "John Doe";

export default function Home() {
  const { signOut } = useAuth();
  const { data, isLoading, error } = useGetHospitalsQuery();

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
            <Text variant="p2_medium">Welcome, {dummyUserName}</Text>
          </Box>
          <Text
            onPress={signOut}
            variant="p4_primary"
            style={{ textDecorationLine: "underline" }}
          >
            Sign Out
          </Text>
        </Box>

        {/* Title */}
        <Text variant="h4" mb="sm">
          Nearby Hospitals
        </Text>

        {/* Hospital List */}
        {isLoading ? (
          <Text variant="p3">Loading...</Text>
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
                backgroundColor="primary"
                p="md"
                borderRadius={"xl"}
                mb="sm"
                shadowColor="black"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={4}
              >
                <Text variant="p2_medium" color="white">
                  {item.name}
                </Text>
                <Text variant="p4_white">{item.address}</Text>
                <Text variant="p4_white">
                  Services: {item.services.join(", ")}
                </Text>
              </Box>
            )}
          />
        )}
      </Box>
    </Screen>
  );
}
