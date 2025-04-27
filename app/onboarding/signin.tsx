import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { authenticate } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          authenticate("accessToken");
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
