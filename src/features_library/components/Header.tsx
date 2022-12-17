import React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton} from 'react-native-paper';
import {Box, Icon, Row, Text, TouchableRipple} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
const Header = () => {
  const {colors, sizes} = useAppTheme();
  const {t} = useTranslation();
  return (
    <TouchableRipple
      marginTop="searchbarHeader"
      onPress={() => {}}
      borderRadius="hg"
      marginHorizontal="m"
      marginBottom="s"
      borderless>
      <Row
        alignItems="center"
        height={sizes.searchbar}
        paddingLeft="m"
        backgroundColor="surfaceVariant">
        <Icon
          name="magnify"
          size={sizes.l}
          mr="m"
          color={colors.onSurfaceVariant}
        />
        <Box flex={1}>
          <Text textAlign="left" color="onSurfaceVariant" variant="bodyLarge">
            {t('search')}
          </Text>
        </Box>

        <IconButton icon="dots-vertical" size={sizes.l} onPress={() => {}} />
      </Row>
    </TouchableRipple>
  );
};

export default Header;
