import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTokenToAsyncStorage = async (key: string, token: string) => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    throw error;
  }
};

export const retrieveTokenFromAsyncStorage = async (key: string) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
