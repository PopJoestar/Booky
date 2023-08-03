import React from 'react';
import {createBox} from '@shopify/restyle';
import {SearchbarProps, Searchbar as PSearchbar} from 'react-native-paper';
import {Theme} from '@/theme';

const _Searchbar = (props: Omit<SearchbarProps, 'theme'>) => {
  return <PSearchbar {...props} />;
};

const Searchbar = createBox<Theme, Omit<SearchbarProps, 'theme'>>(_Searchbar);

export default Searchbar;
