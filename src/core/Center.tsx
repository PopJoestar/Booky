import React from 'react';
import Box from './Box';
import {BoxProps} from '@shopify/restyle';
import {Theme} from '@/theme';

type Props = Omit<BoxProps<Theme>, 'alignItems' | 'justifyContent'> & {
  children: React.ReactNode;
};

const Center = ({children, ...rest}: Props) => {
  return (
    <Box alignItems="center" justifyContent="center" {...rest}>
      {children}
    </Box>
  );
};

export default Center;
