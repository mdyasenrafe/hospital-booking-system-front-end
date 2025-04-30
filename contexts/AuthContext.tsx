import React, { createContext, useState, useCallback, useEffect } from "react";
import { AuthContextType, AuthProviderProps, AuthState } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveTokenToAsyncStorage } from "@/utils";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: "",
  });
  const [userData, setUserData] = useState<any | null>(null);

  const authenticate = useCallback(async (accessToken: string) => {
    try {
      await saveTokenToAsyncStorage("accessToken", accessToken);

      setAuthState((prevState) => {
        return {
          ...prevState,
          accessToken,
          isAuthenticated: true,
        };
      });
    } catch (error) {
      console.error("Error in authenticate:", error); // Debug log
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: "",
    });
    await AsyncStorage.removeItem("accessToken");
    setUserData(null);
  }, []);

  const value = {
    authState,
    authenticate,
    signOut,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
