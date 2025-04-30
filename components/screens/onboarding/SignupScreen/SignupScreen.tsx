import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, RemoteImage, Text } from "@/components/atoms";
import { useAuth } from "@/hooks";
import Logo from "../../../../assets/images/logo.png";
import { SignupForm } from "@/components/organisms";
import {
  addToken,
  addUser,
  TSignupPayload,
  useSignupMutation,
} from "@/redux/features/auth";
import { useGlobalSnackbars } from "@/contexts/SnackbarContext";
import { router } from "expo-router";
import { useAppDispatch } from "@/redux";

export const SignupScreen = () => {
  const { addErrorSnackbar, addSuccessSnackbar } = useGlobalSnackbars();
  const [error, setError] = useState<string>("");
  const { authenticate } = useAuth();
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();

  const handleSignup = async (values: TSignupPayload) => {
    try {
      setError("");
      const response = await signup(values).unwrap();
      if (response?.data) {
        dispatch(
          addUser({ user: response?.data, token: response?.token as string })
        );
        if (response?.token) {
          dispatch(addToken({ token: response?.token as string }));
        }
        authenticate(response?.token as string);
        addSuccessSnackbar({ message: "Account created successfully!" });
        router.replace("/(app)");
      }
    } catch (err: any) {
      console.error(err);
      const message = err?.data?.message || "Something went wrong!";
      setError(message);
      addErrorSnackbar({ message });
    }
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
