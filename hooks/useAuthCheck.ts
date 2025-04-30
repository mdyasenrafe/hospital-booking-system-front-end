import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { retrieveTokenFromAsyncStorage } from "@/utils";
import { useAppDispatch } from "@/redux";
import { addToken, addUser } from "@/redux/features/auth";
import { useLazyGetProfileQuery } from "@/redux/features/users";

export const useAuthCheck = () => {
  const { authenticate } = useAuth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [triggerGetProfile] = useLazyGetProfileQuery();

  const checkAuthentication = useCallback(async () => {
    try {
      const accessToken = await retrieveTokenFromAsyncStorage("accessToken");

      if (accessToken) {
        dispatch(addToken({ token: accessToken }));
        await authenticate(accessToken);

        const res = await triggerGetProfile().unwrap();
        dispatch(addUser({ user: res?.data, token: accessToken as string }));
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  }, [authenticate, dispatch, triggerGetProfile]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return { loading };
};
