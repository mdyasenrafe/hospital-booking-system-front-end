import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth, useAuthCheck } from "@/hooks";
import { Box, LoadingSpinner, Text } from "@/components/atom";
import { BASE_COLORS } from "@/theme/elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabConfig = {
  title: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function AppLayout() {
  const { bottom } = useSafeAreaInsets();
  const { authState } = useAuth();
  const { loading } = useAuthCheck();
  console.log("comming");
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authState.isAuthenticated) {
    return <Redirect href="/onboarding/signin" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#e0e0e0",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BASE_COLORS.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70 + bottom,
          paddingBottom: bottom + 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          if (route.name === "index") iconName = "home";
          else if (route.name === "booking") iconName = "event-note";
          else iconName = "help";

          return (
            <MaterialIcons
              name={iconName}
              size={focused ? 28 : 24}
              color={color}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontSize: 12,
              fontWeight: focused ? "600" : "400",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {route.name === "index" ? "Home" : "Booking"}
          </Text>
        ),
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="booking" />
    </Tabs>
  );
}
