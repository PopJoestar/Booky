import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import {Searchbar} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
import Filters from './Filters';

type Props = {};

const Header = (props: Props) => {
  const {colors, textVariants} = useAppTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <>
      <StatusBar backgroundColor={colors.surface} />
      <Searchbar
        value={searchInput}
        onChangeText={setSearchInput}
        marginTop="l"
        elevation={0}
        inputStyle={textVariants.bodyLarge}
        icon="keyboard-backspace"
        onIconPress={navigation.goBack}
        backgroundColor="surfaceVariant"
        iconColor={colors.onSurface}
        placeholder={t('common:search')}
      />
      <Filters marginTop={'m'} />
    </>
  );
};

export default Header;
