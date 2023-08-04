import {Theme} from '@/theme';
import {createBox} from '@shopify/restyle';
import {IconButtonProps, IconButton as RNIconButton} from 'react-native-paper';

const IconButton = createBox<Theme, IconButtonProps>(RNIconButton);

export default IconButton;
