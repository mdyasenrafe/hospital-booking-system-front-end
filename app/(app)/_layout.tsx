import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth, useAuthCheck } from "@/hooks";

export default function AppLayout() {
  const { authState } = useAuth();
  const { loading } = useAuthCheck();

  if (!authState.isAuthenticated) {
    return <Redirect href="/onboarding/signin" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
