import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
  useRestyle,
  composeRestyleFunctions,
  layout,
  spacing,
  border,
  backgroundColor,
} from "@shopify/restyle";
import { Theme } from "../../../theme";
import { palette } from "../../../theme/elements";
import { Box } from "../Box";
import { Text } from "../Text";
import { Row } from "../Row";
import { RestyleInputProps, TextInputProps } from "./types";
import { FONTS } from "../../../theme/fonts";

export const InputBox: React.FC<TextInputProps> = React.memo(
  ({
    onChangeText,
    value,
    placeholder = "",
    isSecureTextEntry = false,
    placeholderTextColor,
    inputStyle,
    inputType,
    capitalizationMode = "none",
    isEditable,
    textMaxLength,
    hasShowPasswordOption,
    showPasswordToggleComponent,
    keyboardReturnKeyType,
    returnKeyLabelText,
    onReturnKeySubmit,
    textInputRef,
    shouldAutoFocus,
    leadingIcon,
    leadingIconComponent,
    onBlur,
    label,
    error,
    labelColor = "black",
    multiline,
    ...rest
  }) => {
    const restyleFunctions = composeRestyleFunctions<Theme, RestyleInputProps>([
      spacing,
      border,
      backgroundColor,
      layout,
    ]);
    const props = useRestyle(restyleFunctions, rest);

    return (
      <Box>
        {label && (
          <Row mt="xl" alignItems="center" justifyContent="space-between">
            <Text variant="p1_medium" color={labelColor}>
              {label}
            </Text>
            {error && (
              <Box>
                <Text variant="p4" color="red">
                  {error}
                </Text>
              </Box>
            )}
          </Row>
        )}
        <View
          {...props}
          style={[
            styles.container,
            props.style,
            error ? { borderColor: "red" } : {},
          ]}
        >
          <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            secureTextEntry={isSecureTextEntry}
            placeholderTextColor={placeholderTextColor}
            style={[styles.input, inputStyle]}
            autoCapitalize={capitalizationMode}
            keyboardType={inputType}
            defaultValue={value}
            editable={isEditable}
            maxLength={textMaxLength}
            onSubmitEditing={onReturnKeySubmit}
            returnKeyLabel={returnKeyLabelText}
            returnKeyType={keyboardReturnKeyType}
            ref={textInputRef || null}
            autoFocus={shouldAutoFocus}
            onBlur={onBlur}
            multiline={multiline}
          />
          {hasShowPasswordOption && showPasswordToggleComponent}
        </View>
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: palette.black,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontSize: 14,
    color: palette.black,
    width: "100%",
    padding: 16,
    // fontFamily: FONTS.body,
  },
});
