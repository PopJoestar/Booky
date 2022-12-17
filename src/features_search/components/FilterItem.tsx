import React from 'react';
import {Chip} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
import {FilterType} from '../constants';

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
      mode="outlined"
      closeIcon="menu-down"
      height={sizes.chip}
      marginRight="s"
      onPress={_onPress}
      onClose={_onPress}>
      {value}
    </Chip>
  );
};

export default FilterItem;
