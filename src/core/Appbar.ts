import {Theme} from '@/theme';
import {createBox} from '@shopify/restyle';
import {AppbarProps, Appbar as PAppbar} from 'react-native-paper';

const Appbar = createBox<Theme, Omit<AppbarProps, 'theme'>>(PAppbar);

export default Appbar;
