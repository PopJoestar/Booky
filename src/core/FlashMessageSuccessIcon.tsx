import {useAppTheme} from '@/hooks';
import Icon from './Icon';
import Box from './Box';
import React from 'react';

const FlashMessageSuccessIcon = () => {
  const {colors, sizes} = useAppTheme();
  return (
    <Box alignItems={'center'} justifyContent={'center'} marginRight={'m'}>
      <Icon
        name="check-circle"
        color={colors.inverseOnSurface}
        size={sizes.l}
      />
    </Box>
  );
};

export default FlashMessageSuccessIcon;
