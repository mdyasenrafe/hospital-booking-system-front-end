import { Box, Text } from "@/components/atom";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "@/components/atom";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <TouchableOpacity
          onPress={() => router.replace("../")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Go to home screen!</Text>
        </TouchableOpacity>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
