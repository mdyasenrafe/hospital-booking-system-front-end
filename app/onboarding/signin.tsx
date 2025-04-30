import { KeyboardAwareView, Screen } from "@/components/atoms";
import { SigninScreen } from "@/components/screens/onboarding";
import React, { useState } from "react";

const Signin = () => {
  return (
    <KeyboardAwareView>
      <Screen name="Home">
        <SigninScreen />
      </Screen>
    </KeyboardAwareView>
  );
};

export default Signin;
