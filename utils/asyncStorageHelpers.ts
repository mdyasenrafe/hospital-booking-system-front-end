import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokenToAsyncStorage = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('AsyncStorage Error: ', error);
  }
};

export const retrieveTokenFromAsyncStorage = async (
  key: string,
): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('AsyncStorage Error: ', error);
    return null;
  }
};
