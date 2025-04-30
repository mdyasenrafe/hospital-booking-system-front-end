import { Box, Text } from "@/components/atoms";
import { THospital } from "@/redux/features/hospital/types";
import React from "react";

export const HospitalCard = React.memo(
  ({
    hospital,
    onBookService,
  }: {
    hospital: THospital;
    onBookService: (id: string, name: string, service: string) => void;
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
      <Text variant="p3_bold" mb="xs">
        {hospital.name}
      </Text>
      <Text variant="p4" color="textDark" mb="sm">
        {hospital.address}
      </Text>

      <Box flexDirection="row" flexWrap="wrap" gap="xs">
        {hospital.services.map((service) => (
          <ServiceChip
            key={`${hospital._id}-${service}`}
            service={service}
            onPress={() => onBookService(hospital._id, hospital.name, service)}
          />
        ))}
      </Box>
    </Box>
  )
);

const ServiceChip = React.memo(
  ({ service, onPress }: { service: string; onPress: () => void }) => (
    <Box
      backgroundColor="primary"
      borderRadius="md"
      px="sm"
      py="xs"
      mr="xs"
      mt="xs"
    >
      <Text variant="p4_white" onPress={onPress}>
        Book: {service}
      </Text>
    </Box>
  )
);
