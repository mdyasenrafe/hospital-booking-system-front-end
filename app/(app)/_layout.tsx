import { Redirect, Stack } from "expo-router";
import { useAuth, useAuthCheck } from "@/hooks";
import { LoadingSpinner } from "@/components/atom";

export default function AppLayout() {
  const { authState } = useAuth();
  const { loading } = useAuthCheck();
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authState.isAuthenticated) {
    return <Redirect href="/onboarding/signin" />;
  }

  return <Stack />;
}
