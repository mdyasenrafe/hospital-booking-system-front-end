import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  useRestyle,
  backgroundColor,
  border,
  spacing,
  composeRestyleFunctions,
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
  LayoutProps,
  layout,
} from "@shopify/restyle";
import { Theme } from "../../../theme";
import { Text, TextProps } from "../Text";
import { palette } from "../../../theme/elements";

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    style?: ViewStyle | ViewStyle[];
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  layout,
]);

interface ButtonProps extends RestyleProps {
  onPress?: () => void;
  label: string;
  variant?: TextProps["variant"];
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingColor?: "primary" | "white";
  icon?: boolean;
  iconComponent?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  variant = "buttonLabel",
  isLoading,
  isDisabled,
  loadingColor,
  icon,
  iconComponent,
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      disabled={isDisabled}
      style={[styles.container, props.style]}
    >
      {isLoading ? (
        <ActivityIndicator
          color={loadingColor === "primary" ? palette.primary : "white"}
        />
      ) : (
        <>
          {icon && iconComponent}
          <Text variant={variant}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
