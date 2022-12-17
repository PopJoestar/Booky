import React from 'react';
import {IconButton} from 'react-native-paper';
import {Box, Icon, Row, Text, TouchableRipple} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
const Header = () => {
  const {colors, sizes} = useAppTheme();
  return (
    <TouchableRipple
      marginTop="searchbarHeader"
      onPress={() => {}}
      borderRadius="hg"
      marginHorizontal="m"
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
            Search title, author
          </Text>
        </Box>

        <IconButton icon="dots-vertical" size={sizes.l} onPress={() => {}} />
      </Row>
    </TouchableRipple>
  );
};

export default Header;
