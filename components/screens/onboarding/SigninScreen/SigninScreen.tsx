import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, RemoteImage, Text } from "@/components/atom";
import { useAuth } from "@/hooks";
import Logo from "../../../../assets/images/logo.png";
import { SigninForm } from "@/components/organisms";

type SigninFormValues = {};

export const SigninScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { authenticate, setUserData } = useAuth();

  const handleSignin = (values: SigninFormValues) => {
    setIsLoading(true);
    setError("");
  };
  return (
    <ScrollView>
      <Box px="lg">
        <Box width={140} height={70} alignSelf="center" mb="md">
          <RemoteImage source={Logo} style={styles.logo} />
        </Box>
        <Text variant="h3" marginBottom="sm">
          Welcome Back!
        </Text>
        <Text variant="p3" marginBottom="md">
          Please sign in to continue to your account. Enter your details below.
        </Text>
        <SigninForm
          handleSignin={handleSignin}
          isLoading={isLoading}
          isDisabled={isLoading}
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
