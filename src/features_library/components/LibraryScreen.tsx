import React from 'react';
import {Searchbar} from '../../shared/components';

type Props = {};

const LibraryScreen = (props: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return <></>;
};

export default LibraryScreen;
