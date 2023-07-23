import React, {useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

import {useResponsiveProp} from '@shopify/restyle';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useAppTheme} from '../../hooks';
import {SharedValue} from 'react-native-reanimated';

export type BottomSheetProps = Omit<BottomSheetModalProps, 'snapPoints'> & {
  children: React.ReactNode;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
};

const BottomSheet = React.forwardRef<BottomSheetModalMethods, BottomSheetProps>(
  ({children, snapPoints, ...rest}, ref) => {
    const {colors, borderRadii, sizes, spacing} = useAppTheme();
    const _snapPoints = useMemo(
      () => snapPoints ?? ['60%', '90%'],
      [snapPoints],
    );
    const marginHorizontal = useResponsiveProp({
      base: spacing.none,
      sm: spacing.none,
      md: spacing.bottomSheetLargeScreenMargin,
      lg: spacing.bottomSheetLargeScreenMargin,
      xl: spacing.bottomSheetLargeScreenMargin,
      xxl: spacing.bottomSheetLargeScreenMargin,
    });

    const renderBackDrop = (_props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {..._props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );

    return (
      <BottomSheetModal
        {...rest}
        ref={ref}
        snapPoints={_snapPoints}
        handleIndicatorStyle={{
          backgroundColor: colors.onSurfaceVariant,
          width: sizes.bottomSheetHandle,
          marginBottom: spacing.bottomSheetHandleVertical,
        }}
        backdropComponent={renderBackDrop}
        backgroundStyle={{
          backgroundColor: colors.surface,
          borderTopEndRadius: borderRadii.md,
          marginHorizontal,
        }}>
        {children}
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;
