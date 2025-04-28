import { KeyboardAwareView, Screen } from "@/components/atom";
import { SignupScreen } from "@/components/screens/onboarding";

const Signup = () => {
  return (
    <KeyboardAwareView>
      <Screen name="Signup">
        <SignupScreen />
      </Screen>
    </KeyboardAwareView>
  );
};

export default Signup;
