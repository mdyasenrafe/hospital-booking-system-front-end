import { AuthProvider } from "@/contexts/AuthContext";
import { AppThemeProvider } from "@/theme";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
