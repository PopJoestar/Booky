import {BookStatus} from '@/features_library/types';
import {Icon, IconProps} from '@/shared/components';
import {useAppTheme} from '@/shared/hooks';
import React from 'react';

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
