import React from 'react';
import Box from './Box';
import {StackProps} from './types';

const Column = ({children, space, ...rest}: StackProps) => {
  const nbrOfChildren = React.Children.count(children);
  return (
    <Box {...rest} flexDirection="column">
      {React.Children.map(children, (child, i) =>
        child ? (
          <Box
            marginBottom={space && i < nbrOfChildren - 1 ? space : undefined}>
            {child}
          </Box>
        ) : null,
      )}
    </Box>
  );
};

export default Column;
