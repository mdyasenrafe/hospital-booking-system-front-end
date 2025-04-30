import React, { useState, useCallback } from "react";
import EyeIcon from "../../../assets/icons/auth/eyeIcon.svg";
import EyeOffIcon from "../../../assets/icons/auth/eyeOffIcon.svg";
import { Formik } from "formik";
import { Button, Row, Text, TouchableOpacity } from "@/components/atoms";
import { FormInputBox } from "@/components/forms";
import { SigninValidationSchema } from "@/schema";
import { Link } from "expo-router";
import { TSigninPayload } from "@/redux/features/auth";

type SigninFormProps = {
  handleSignin: (values: TSigninPayload) => void;
  isLoading: boolean;
  isDisabled: boolean;
  error: string;
};

export const SigninForm: React.FC<SigninFormProps> = ({
  handleSignin,
  isLoading,
  isDisabled,
  error,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const passwordToggleComponent = (
    <TouchableOpacity width={24} height={24} onPress={togglePasswordVisibility}>
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </TouchableOpacity>
  );

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={SigninValidationSchema}
      onSubmit={handleSignin}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <>
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
            placeholder="Type your password"
            placeholderTextColor="gray"
            isSecureTextEntry={!showPassword}
            hasShowPasswordOption={true}
            showPasswordToggleComponent={passwordToggleComponent}
            inputStyle={{
              width: "90%",
            }}
            paddingRight="lg"
            marginTop="lg"
            height={54}
          />

          {error && (
            <Text color="red" mt="lg">
              {error}
            </Text>
          )}
          <Button
            label="Sign In"
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
            <Text variant="p2">Don't have an account? </Text>
            <TouchableOpacity>
              <Link href={"/onboarding/signup"}>
                <Text variant="p2" color="blue" fontWeight="bold">
                  Create an account
                </Text>
              </Link>
            </TouchableOpacity>
          </Row>
        </>
      )}
    </Formik>
  );
};
