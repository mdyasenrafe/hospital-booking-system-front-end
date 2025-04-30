import { AuthProvider } from "@/contexts/AuthContext";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { store } from "@/redux";
import { AppThemeProvider } from "@/theme";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { Provider, PaperProvider } from "react-native-paper";
import { GlobalSnackbars } from "@/components/atom/Snackbar/SnackbarContainer";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <Provider>
          <PaperProvider>
            <SnackbarProvider>
              <AppThemeProvider>
                <AuthProvider>
                  <Slot />
                  <GlobalSnackbars />
                </AuthProvider>
              </AppThemeProvider>
            </SnackbarProvider>
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
