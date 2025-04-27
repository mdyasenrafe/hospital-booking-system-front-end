import React from 'react';
import {createBox} from '@shopify/restyle';
import type {BoxProps as RestyleBoxProps} from '@shopify/restyle';
import {Theme} from '../../../theme';

export type BoxProps = RestyleBoxProps<Theme> & {
  children?: React.ReactNode;
};

export const Box = createBox<Theme>();
