import {createBox} from '@shopify/restyle';
import {AppbarProps, Appbar as PAppbar} from 'react-native-paper';
import {Theme} from '../../../theme';

const Appbar = createBox<Theme, Omit<AppbarProps, 'theme'>>(PAppbar);

export default Appbar;
