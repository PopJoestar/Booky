import React from 'react';
import Box from './Box';
import {StackProps} from './types';

const Row = ({children, ...rest}: StackProps) => {
  return (
    <Box {...rest} flexDirection="row">
      {children}
    </Box>
  );
};

export default Row;
