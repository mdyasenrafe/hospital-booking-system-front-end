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

  console.log("authcontext.tsx file");

  // Memoize the authenticate function
  const authenticate = useCallback(async (accessToken: string) => {
    console.log("authenticated calling");
    saveTokenToAsyncStorage("accessToken", accessToken);
    setAuthState((prevState) => ({
      ...prevState,
      accessToken,
      isAuthenticated: true,
    }));
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
