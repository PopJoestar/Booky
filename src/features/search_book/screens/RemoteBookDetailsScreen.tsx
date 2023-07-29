import React, {useMemo} from 'react';
import {
  Box,
  Row,
  Image,
  Text,
  RenderHTML,
  ScrollView,
  Button,
  AnimatedBox,
  Chip,
} from '@/shared/components';
import {List} from 'react-native-paper';
import {StringUtils} from '@/shared/utils';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useAppTheme} from '@/shared/hooks';

import {RemoteBookDetailsScreenRouteProp} from '@/navigation/types';
import {useTempBookStore} from '../stores/tempBookStore';

import useGetRemoteBookDetailsQuery from '../hooks/useGetRemoteBookDetailsQuery';
import {Constants} from '@/constants';

const RemoteBookDetailsScreen = () => {
  const {sizes} = useAppTheme();
  const {t} = useTranslation();
  const {params} = useRoute<RemoteBookDetailsScreenRouteProp>();

  const currentBook = useTempBookStore(state => state.tempBook);
  const setDetails = useTempBookStore(state => state.setDetails);

  const {isLoading, error} = useGetRemoteBookDetailsQuery({
    bookDetailsUrl: params.details_url,
    onSuccess: data => {
      setDetails(data);
    },
  });

  const description = useMemo(() => {
    return {html: `<p>${currentBook.description}</p>`};
  }, [currentBook.description]);

  const style = useAnimatedStyle(() => ({
    opacity: withTiming(isLoading ? 0.4 : 1),
  }));

  return (
    <AnimatedBox flex={1} style={style}>
      <ScrollView paddingTop="l" showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="m">
          <Row>
            <Image
              source={{uri: currentBook.image}}
              height={sizes.book_poster_image_height}
              width={sizes.book_poster_image_width}
            />
            <Box flex={1} marginHorizontal="m">
              <Text variant="titleLarge">{currentBook.title}</Text>
              <Text
                variant="labelMedium"
                marginTop="s"
                color="onSurfaceVariant">
                {currentBook.authors.join(', ')}
              </Text>
            </Box>
          </Row>
          {currentBook.description ? (
            <Animated.View entering={FadeIn}>
              <RenderHTML source={description} />
            </Animated.View>
          ) : null}
        </Box>
        <List.Item
          title={t('book_details:book_info_label.publisher_publication_date')}
          description={
            currentBook.publisher || currentBook.year
              ? StringUtils.merge([currentBook.publisher, currentBook.year])
              : t('unkown')
          }
        />
        <List.Item
          title={t('book_details:book_info_label.nbr_page')}
          description={
            currentBook.nbrOfPages ? currentBook.nbrOfPages : t('unkown')
          }
        />
        <List.Item
          title={t('book_details:book_info_label.isbn')}
          description={
            currentBook.isbns && currentBook.isbns.length > 0
              ? currentBook.isbns.join(', ')
              : t('unkown')
          }
        />
        <List.Item
          title={t('book_details:book_info_label.file')}
          description={StringUtils.merge([
            currentBook.size,
            currentBook.extension,
          ])}
        />
        <List.Item
          title={t('book_details:book_info_label.language')}
          description={currentBook.language}
        />
        {StringUtils.notEmpty(currentBook.series) ? (
          <List.Item
            title={t('book_details:book_info_label.series')}
            description={currentBook.series}
          />
        ) : null}
        <Box height={sizes.l} />
      </ScrollView>

      <Row
        paddingVertical="s"
        paddingRight={'m'}
        justifyContent={'space-around'}
        alignSelf="flex-end">
        <Box flex={1}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            paddingLeft={'s'}
            marginRight={'s'}>
            {currentBook.downloadLinks
              ?.filter(({host}) =>
                Constants.VALID_HOSTS.includes(host.trim().toLowerCase()),
              )
              .map((downloadLink, index) => (
                <Chip marginLeft={'s'} key={index} mode="outlined">
                  {downloadLink.host}
                </Chip>
              ))}
            <Box width={40} />
          </ScrollView>
        </Box>

        <Button
          mode="contained"
          disabled={isLoading || !!error}
          onPress={async () => {
            // const filename = getFileNameFromDownloadLink(
            //   currentBook.downloadLinks[2].link,
            // );
            // const downloadResumable = FileSystem.createDownloadResumable(
            //   currentBook.downloadLinks[2].link,
            //   FileSystem.documentDirectory + filename,
            //   {},
            //   e => console.log(e),
            // );
            // try {
            //   console.log('download starts');
            //   const downloadResult = await downloadResumable.downloadAsync();
            //   if (downloadResult == null) {
            //     console.log('null');
            //     return;
            //   }
            //   await FS.cpExternal(
            //     downloadResult.uri,
            //     'caca',
            //     `${settings.downloadPath}`,
            //   );
            //   console.log('Finished downloaded to ', downloadResult.uri);
            // } catch (e) {
            //   console.log(e);
            //   Alert.alert('cou', JSON.stringify(e));
            // }
          }}>
          {t('common:download')}
        </Button>
      </Row>
    </AnimatedBox>
  );
};

export default RemoteBookDetailsScreen;
