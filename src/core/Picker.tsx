import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetFlatListProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {createBox, useResponsiveProp} from '@shopify/restyle';
import React, {ReactNode, Ref, forwardRef, useMemo} from 'react';
import {ListRenderItem, useWindowDimensions} from 'react-native';
import BottomSheet from './BottomSheet';
import {List, ListItemProps} from 'react-native-paper';
import {Theme} from '@/theme';

const StyledBottomSheetFlatlist = createBox<
  Theme,
  BottomSheetFlatListProps<any>
>(BottomSheetFlatList);

export type Option = Pick<
  ListItemProps,
  'title' | 'description' | 'titleStyle'
> & {
  value?: any;
};

export type PickerProps = {
  options: Option[];
  selectedIndex?: number;
  onPick?: (item: number) => void;
  ref?: Ref<BottomSheetModalMethods>;
  header?: ReactNode;
  itemHeight: number;
};

function PickerItem({
  index,
  onPress,
  selectedIndex,
  item,
}: {
  item: ListItemProps;
  index: number;
  onPress: (item: number) => void;
  selectedIndex?: number;
}) {
  const _onPress = () => {
    onPress(index);
  };

  const renderTrailingIcon: ListItemProps['right'] = props => {
    if (selectedIndex !== index) {
      return undefined;
    }

    return <List.Icon icon={'check'} {...props} />;
  };

  return <List.Item onPress={_onPress} right={renderTrailingIcon} {...item} />;
}

const Picker = forwardRef<BottomSheetModalMethods, PickerProps>(
  ({options, selectedIndex, onPick, header, itemHeight}, ref) => {
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
        onPick(index);
      }
    };

    const renderItem: ListRenderItem<any> = ({item, index}) => {
      return (
        <PickerItem
          item={item}
          selectedIndex={selectedIndex}
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

    return (
      <BottomSheet ref={ref} snapPoints={snapPoints}>
        {header}
        <StyledBottomSheetFlatlist
          keyExtractor={keyExtract}
          data={options}
          renderItem={renderItem}
          marginHorizontal={marginHorizontal}
        />
      </BottomSheet>
    );
  },
);

const keyExtract = (_: any, index: number) => index.toString();

export default Picker;
