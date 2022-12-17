import {createBox} from '@shopify/restyle';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../../../theme';

const Icon = createBox<Theme, IconProps>(MaterialCommunityIcons);

export default Icon;
