import React from 'react';
import Box, {BoxProps} from './Box';

const Row = ({children, ...rest}: Omit<BoxProps, 'flexDirection'>) => {
  return (
    <Box {...rest} flexDirection="row">
      {children}
    </Box>
  );
};

export default Row;
