import {createBox} from '@shopify/restyle';
import {SearchbarProps, Searchbar as PSearchbar} from 'react-native-paper';
import {Theme} from '../../../theme';

const Searchbar = createBox<Theme, Omit<SearchbarProps, 'theme'>>(PSearchbar);

export default Searchbar;
