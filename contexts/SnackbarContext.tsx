import React, { useCallback, useContext, useState } from "react";
import uuid from "react-native-uuid";

export type SnackbarMessageType = "error" | "success";

export type SnackbarType = {
  id: string;
  message: string;
  type: SnackbarMessageType;
};

type AddSnackbar = Pick<SnackbarType, "message" | "type"> & {
  timeout?: number;
};

export const DEFAULT_TIMEOUT = 6500;

const useSnackbars = () => {
  const [snackbars, setSnackbars] = useState<SnackbarType[]>([]);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addSnackbar = useCallback(
    ({ message, type, timeout = DEFAULT_TIMEOUT }: AddSnackbar) => {
      const id = String(uuid.v4());
      const newSnackbar: SnackbarType = { id, message, type };
      setSnackbars((prev) => [...prev, newSnackbar]);

      setTimeout(() => removeSnackbar(id), timeout);
    },
    [removeSnackbar]
  );

  const addErrorSnackbar = useCallback(
    (data: Omit<AddSnackbar, "type">) =>
      addSnackbar({ ...data, type: "error" }),
    [addSnackbar]
  );

  const addSuccessSnackbar = useCallback(
    (data: Omit<AddSnackbar, "type">) =>
      addSnackbar({ ...data, type: "success" }),
    [addSnackbar]
  );

  return {
    snackbars,
    addSnackbar,
    removeSnackbar,
    addErrorSnackbar,
    addSuccessSnackbar,
  };
};

type SnackbarContextType = ReturnType<typeof useSnackbars>;

const SnackbarContext = React.createContext<SnackbarContextType>({
  snackbars: [],
  addSnackbar: () => {},
  removeSnackbar: () => {},
  addErrorSnackbar: () => {},
  addSuccessSnackbar: () => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const snackbar = useSnackbars();
  return (
    <SnackbarContext.Provider value={snackbar}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useGlobalSnackbars = () => useContext(SnackbarContext);
