import React from 'react';
import {Box} from '../Box';
import {ActivityIndicator} from 'react-native';
import {getScreenDimensions} from '../../../utils/screenDimensions';
import {palette} from '../../../theme/elements';

type LoadingSpinnerProps = {
  height?: number;
  width?: number;
  size?: 'large' | 'small';
  color?: string;
};
const {screenHeight, screenWidth} = getScreenDimensions();

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  height = screenHeight,
  width = screenWidth,
  size = 'small',
  color = palette.primary,
}) => {
  return (
    <Box
      width={width}
      height={height}
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator
        size={size == 'small' || size == 'large' ? size : 'small'}
        color={color}
      />
    </Box>
  );
};
