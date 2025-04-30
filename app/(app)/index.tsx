import { View, Text } from "react-native";
import { useAuth } from "@/hooks";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text onPress={signOut} style={{ marginTop: 20, color: "blue" }}>
        Sign Out
      </Text>
    </View>
  );
}
