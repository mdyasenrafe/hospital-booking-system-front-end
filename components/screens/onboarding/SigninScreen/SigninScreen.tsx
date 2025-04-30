import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, RemoteImage, Text } from "@/components/atom";
import { useAuth } from "@/hooks";
import Logo from "../../../../assets/images/logo.png";
import { SigninForm } from "@/components/organisms";
import { TSigninPayload, useLoginMutation } from "@/redux/features/auth";
import { useGlobalSnackbars } from "@/contexts/SnackbarContext";
import { router } from "expo-router";

export const SigninScreen = () => {
  const { addErrorSnackbar, addSuccessSnackbar } = useGlobalSnackbars();
  const [error, setError] = useState<string>("");
  const { authenticate, setUserData, authState } = useAuth();
  const [login, { isLoading }] = useLoginMutation();

  const handleSignin = async (values: TSigninPayload) => {
    try {
      setError("");
      const response = await login(values).unwrap();
      if (response?.data) {
        setUserData(response.data);
        await authenticate(response?.token as string);
        addSuccessSnackbar({
          message: "Login successful!",
        });
        router.replace("/(app)/home");
      }
    } catch (err: any) {
      const message = err?.data?.message || "Something went wrong!";
      addErrorSnackbar({ message });
      setError(message);
    }
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
