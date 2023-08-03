import {Icon} from '@/core';
import {useAppTheme} from '@/hooks';
import React from 'react';
import {IconProps} from '@/core/Icon';
import {BookStatus} from '@/types/status';

const BookStatusIcon = ({
  status,
  ...rest
}: {
  status?: BookStatus;
} & Omit<IconProps, 'name'>) => {
  const {sizes, colors} = useAppTheme();

  if (status !== 'downloaded' && status !== 'saved') {
    return null;
  }

  switch (status) {
    case 'downloaded':
      return (
        <Icon
          name="checkbox-marked-circle"
          size={sizes.l}
          color={colors.tertiary}
          {...rest}
        />
      );
    case 'saved':
      return (
        <Icon
          name="bookmark"
          size={sizes.l}
          color={colors.tertiary}
          {...rest}
        />
      );
  }
};

export default BookStatusIcon;
