import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, RemoteImage, Text } from "@/components/atom";
import { useAuth } from "@/hooks";
import Logo from "../../../../assets/images/logo.png";
import { SignupForm } from "@/components/organisms";

type SignupFormValues = {};

export const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { authenticate, setUserData } = useAuth();

  const handleSignup = (values: SignupFormValues) => {
    setIsLoading(true);
    setError("");

    // You can handle signup logic here (e.g., API call, etc.)
  };

  return (
    <ScrollView>
      <Box px="lg">
        <Box width={140} height={70} alignSelf="center" mb="md">
          <RemoteImage source={Logo} style={styles.logo} />
        </Box>
        <Text variant="h3" marginBottom="sm">
          Create Account
        </Text>
        <Text variant="p3" marginBottom="md">
          Please fill the form to create your account.
        </Text>
        <SignupForm
          handleSignup={handleSignup}
          isLoading={isLoading}
          error={error}
        />
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
