import { Box, Text } from "@/components/atoms";
import { Feather } from "@expo/vector-icons";
import React from "react";

export const Header = React.memo(
  ({ userName, onSignOut }: { userName?: string; onSignOut: () => void }) => (
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
        <Text variant="p2_medium">Welcome, {userName || "User"}</Text>
      </Box>
      <Text
        onPress={onSignOut}
        variant="p4_primary"
        style={{ textDecorationLine: "underline" }}
      >
        Sign Out
      </Text>
    </Box>
  )
);
