import React, { useState, useCallback } from "react";
import { Formik } from "formik";
import { Button, Row, Text, TouchableOpacity } from "@/components/atoms";
import { FormInputBox } from "@/components/forms";
import { SignupValidationSchema } from "@/schema";
import EyeIcon from "../../../assets/icons/auth/eyeIcon.svg";
import EyeOffIcon from "../../../assets/icons/auth/eyeOffIcon.svg";
import { Link } from "expo-router";
import { TSignupPayload } from "@/redux/features/auth";

type SignupFormProps = {
  handleSignup: (values: TSignupPayload) => void;
  isLoading: boolean;
  error: string;
};

export const SignupForm: React.FC<SignupFormProps> = ({
  handleSignup,
  isLoading,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const passwordToggleComponent = (
    <TouchableOpacity width={24} height={24} onPress={togglePasswordVisibility}>
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </TouchableOpacity>
  );

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={SignupValidationSchema}
      onSubmit={handleSignup}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <>
          <FormInputBox
            name="name"
            label="Name"
            placeholder="Type your Name"
            placeholderTextColor="gray"
            marginTop="lg"
            height={54}
          />
          <FormInputBox
            name="email"
            label="Email"
            placeholder="Type your Email"
            placeholderTextColor="gray"
            marginTop="lg"
            height={54}
          />
          <FormInputBox
            name="password"
            label="Password"
            placeholder="Type your Password"
            placeholderTextColor="gray"
            isSecureTextEntry={!showPassword}
            hasShowPasswordOption={true}
            inputStyle={{ width: "90%" }}
            paddingRight="lg"
            marginTop="lg"
            height={54}
            showPasswordToggleComponent={passwordToggleComponent}
          />
          {error && (
            <Text color="red" mt="lg">
              {error}
            </Text>
          )}
          <Button
            label="Create Account"
            height={54}
            marginTop="2xl"
            borderRadius="md"
            variant="p1_bold_white"
            onPress={handleSubmit}
            backgroundColor={isValid && dirty ? "primary" : "grey"}
            isLoading={isLoading}
            isDisabled={isLoading || !(isValid && dirty)}
          />
          <Row justifyContent="center" alignItems="center" marginTop="lg">
            <Text variant="p2">Already have an account? </Text>
            <Link href="/onboarding/signin" asChild>
              <TouchableOpacity>
                <Text variant="p2" color="blue" fontWeight="bold">
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
          </Row>
        </>
      )}
    </Formik>
  );
};
