import React, { memo } from "react";
import { useGlobalSnackbars, SnackbarType } from "@/contexts/SnackbarContext";
import { Snackbar } from "./Snackbar";

export const GlobalSnackbars = memo(() => {
  const { snackbars, removeSnackbar } = useGlobalSnackbars();

  return (
    <>
      {snackbars.map((snackbar: SnackbarType) => {
        return (
          <Snackbar
            key={snackbar.id}
            message={snackbar.message}
            type={snackbar.type}
            isVisible={true}
            onClose={() => removeSnackbar(snackbar.id)}
          />
        );
      })}
    </>
  );
});
