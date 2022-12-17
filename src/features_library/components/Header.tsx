import React from 'react';
import {Icon, Row, Text, TouchableRipple} from '../../shared/components';
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
        height={sizes.inputHeight}
        paddingHorizontal="m"
        backgroundColor="surfaceVariant">
        <Icon
          name="magnify"
          size={sizes.l}
          mr="m"
          color={colors.onSurfaceVariant}
        />
        <Text textAlign="left" color="onSurfaceVariant" variant="bodyLarge">
          Search title, author
        </Text>
      </Row>
    </TouchableRipple>
  );
};

export default Header;
