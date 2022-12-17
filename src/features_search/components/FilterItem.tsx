import React from 'react';
import {Chip} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
import {FilterType} from '../constants';

const onClose = () => {};

type Props = {
  data: FilterType;
  onPress?: (item: FilterType) => void;
  value: string;
};

const FilterItem = ({data, onPress, value}: Props) => {
  const {sizes} = useAppTheme();

  const _onPress = () => {
    if (onPress === undefined) {
      return;
    }

    onPress(data);
  };

  return (
    <Chip
      closeIcon="menu-down"
      height={sizes.chip}
      marginRight="s"
      onPress={_onPress}
      onClose={onClose}>
      {value}
    </Chip>
  );
};

export default FilterItem;
