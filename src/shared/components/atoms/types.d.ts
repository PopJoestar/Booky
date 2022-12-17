import {BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {BoxProps} from '@shopify/restyle';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Theme, ThemeSpacingType} from '../../../theme';
import Box from './Box';
import TextInput from './TextInput';

export type StackProps = Omit<BoxProps<Theme>, 'flexDirection'> & {
  children: React.ReactNode;
  space?: ThemeSpacingType;
};

export type TextInputProps = React.ComponentProps<typeof TextInput>;

export type BoxProps = React.ComponentProps<typeof Box>;

export type BottomSheetProps = Omit<BottomSheetModalProps, 'snapPoints'> & {
  children: React.ReactNode;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
};
