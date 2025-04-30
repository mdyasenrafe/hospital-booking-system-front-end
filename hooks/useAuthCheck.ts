import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { retrieveTokenFromAsyncStorage } from "@/utils";
import { useAppDispatch } from "@/redux";
import { addToken } from "@/redux/features/auth";

export const useAuthCheck = () => {
  const { authenticate } = useAuth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const checkAuthentication = useCallback(async () => {
    try {
      const accessToken = await retrieveTokenFromAsyncStorage("accessToken");
      if (accessToken) {
        dispatch(addToken({ token: accessToken }));
        await authenticate(accessToken);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  }, [authenticate]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return { loading };
};
