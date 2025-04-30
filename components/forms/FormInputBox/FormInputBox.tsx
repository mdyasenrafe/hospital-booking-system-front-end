import React, { useState, useCallback, memo } from "react";
import { useField } from "formik";
import { InputBox } from "../../atoms/InputBox";
import { TextInputProps } from "../../atoms/InputBox/types";

type FormInputBoxProps = TextInputProps & {
  name: string;
};

const FormInputBoxComponent: React.FC<FormInputBoxProps> = ({
  name,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const [showError, setShowError] = useState(false);

  const handleChange = useCallback(
    (value: string) => {
      if (showError) setShowError(false);
      helpers.setValue(value);
    },
    [showError, helpers]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
    setShowError(true);
  }, [helpers]);

  const error = showError && meta.touched && meta.error;

  return (
    <InputBox
      {...rest}
      onChangeText={handleChange}
      onBlur={handleBlur}
      value={field.value}
      error={error as string}
    />
  );
};

// Use React.memo to memoize the component
export const FormInputBox = memo(FormInputBoxComponent);
