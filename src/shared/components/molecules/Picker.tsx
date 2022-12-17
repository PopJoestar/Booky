import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetFlatListProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {createBox, useResponsiveProp} from '@shopify/restyle';
import React, {Ref, useCallback, useMemo} from 'react';
import {ListRenderItem, useWindowDimensions} from 'react-native';
import {Theme} from '../../../theme';
import BottomSheet from '../atoms/BottomSheet';
import ListItem from '../atoms/ListItem';

export type PickerProps<T> = {
  options: readonly T[];
  titleExtractor: (item: T) => string;
  selected?: T;
  keyExtractor: (item: T, index: number) => string;
  onPick?: (item: T) => void;
  ref?: Ref<BottomSheetModalMethods>;
  itemHeight?: number;
};

const StyledBottomSheetFlatlist = createBox<
  Theme,
  BottomSheetFlatListProps<any>
>(BottomSheetFlatList);

const PickerItem = ({
  title,
  index,
  onPress,
  isSelected,
}: {
  title: string;
  index: number;
  onPress: (item: number) => void;
  isSelected?: boolean;
}) => {
  const _onPress = () => {
    onPress(index);
  };
  return (
    <ListItem
      title={title}
      trailingIcon={isSelected ? 'check' : undefined}
      onPress={_onPress}
    />
  );
};

const Picker = React.forwardRef<BottomSheetModalMethods, PickerProps<any>>(
  (
    {options, titleExtractor, selected, keyExtractor, onPick, itemHeight},
    ref,
  ) => {
    const {height} = useWindowDimensions();
    const marginHorizontal = useResponsiveProp({
      base: 'none',
      sm: 'none',
      md: 'bottomSheetLargeScreenMargin',
      lg: 'bottomSheetLargeScreenMargin',
      xl: 'bottomSheetLargeScreenMargin',
      xxl: 'bottomSheetLargeScreenMargin',
    });

    const _onPress = (index: number) => {
      if (onPick !== undefined) {
        onPick(options[index]);
      }
    };

    const areEquals = useCallback(
      (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b),
      [],
    );

    const renderItem: ListRenderItem<any> = ({item, index}) => {
      return (
        <PickerItem
          title={titleExtractor(item)}
          isSelected={selected ? areEquals(item, selected) : false}
          onPress={_onPress}
          index={index}
        />
      );
    };

    const snapPoints = useMemo(() => {
      if (itemHeight === undefined) {
        return undefined;
      }

      const listHeight = itemHeight * (options.length + 1);
      if (listHeight > height) {
        return ['25%', '75%', '100%'];
      }

      if (listHeight < height * 0.5) {
        return [listHeight, height * 0.5];
      }

      if (listHeight < height * 0.75) {
        return [listHeight, height * 0.75];
      }

      return undefined;
    }, [height, itemHeight, options.length]);

    console.log(snapPoints);
    return (
      <BottomSheet ref={ref} snapPoints={snapPoints}>
        <StyledBottomSheetFlatlist
          keyExtractor={keyExtractor}
          data={options}
          renderItem={renderItem}
          marginHorizontal={marginHorizontal}
        />
      </BottomSheet>
    );
  },
);

export default Picker as <T>(
  props: PickerProps<T>,
) => ReturnType<typeof Picker>;
