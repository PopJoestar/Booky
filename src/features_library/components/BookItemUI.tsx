import React from 'react';
import {Surface} from 'react-native-paper';
import {
  Row,
  Box,
  TouchableRipple,
  Text,
  Image,
  Icon,
} from '@/shared/components';
import {useAppTheme} from '@/shared/hooks';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {BaseBook} from '@/types';
import {IconProps} from '@/shared/components/atoms/types';
import {BookStatus} from '../types';

export type BookItemUIProps<T extends BaseBook> = {
  item: T;
  onPress?: (item: T) => void;
  status?: BookStatus;
};

function BookItemUI<T extends BaseBook>({
  item,
  onPress,
  status,
}: BookItemUIProps<T>) {
  const {sizes} = useAppTheme();
  const {t} = useTranslation('common');
  const _onPress = () => {
    if (onPress === undefined) {
      return;
    }

    onPress(item);
  };

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
            <Row alignItems={'center'}>
              <Box flex={1}>
                <Text variant="bodyLarge" color="onSurface" numberOfLines={2}>
                  {item.title}
                </Text>
              </Box>

              <StatusIcon status={status} alignSelf="flex-start" />
            </Row>

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
              {[
                item.size.trim().split(' ').splice(0, 2).join(' '),
                item.extension,
                item.language,
              ].join(' \u2022 ')}
            </Text>
          </Box>
        </Row>
      </TouchableRipple>
    </Animated.View>
  );
}

const StatusIcon = ({
  status,
  ...rest
}: {
  status?: BookStatus;
} & Omit<IconProps, 'name'>) => {
  const {sizes} = useAppTheme();

  if (status !== 'downloaded' && status !== 'saved') {
    return null;
  }

  switch (status) {
    case 'downloaded':
      return <Icon name="checkbox-marked-circle" size={sizes.l} {...rest} />;
    case 'saved':
      return <Icon name="bookmark" size={sizes.l} {...rest} />;
  }
};

export default BookItemUI;
