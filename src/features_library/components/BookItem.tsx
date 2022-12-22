import React from 'react';
import {BaseBook} from '../../types';
import {Surface} from 'react-native-paper';
import {Row, Box, TouchableRipple, Text, Image} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';

type Props<T extends BaseBook> = {
  item: T;
  onPress?: (item: T) => void;
};

function BookItem<T extends BaseBook>({item, onPress}: Props<T>) {
  const {sizes} = useAppTheme();
  const {t} = useTranslation('common');
  const _onPress = () => {
    if (onPress === undefined) {
      return;
    }

    onPress(item);
  };

  console.log(item.authors);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableRipple
        backgroundColor="surface"
        paddingLeft="m"
        paddingVertical="m"
        onPress={_onPress}
        paddingRight="l">
        <Row>
          <Surface elevation={2}>
            <Image
              source={{uri: item.image}}
              height={sizes.book_card_image_height}
              width={sizes.book_card_image_width}
            />
          </Surface>

          <Box flex={1} paddingLeft="m">
            <Text variant="bodyLarge" color="onSurface" numberOfLines={2}>
              {item.title}
            </Text>
            <Text
              variant="bodySmall"
              color="onSurfaceVariant"
              numberOfLines={1}>
              {item.authors.length > 0
                ? item.authors.join(', ')
                : t('unkown_author')}
            </Text>
            <Text
              variant="bodySmall"
              color="onSurface"
              numberOfLines={1}
              opacity={0.6}>
              {[item.size, item.extension].join(' \u2022 ')}
            </Text>
          </Box>
        </Row>
      </TouchableRipple>
    </Animated.View>
  );
}

export default BookItem;
