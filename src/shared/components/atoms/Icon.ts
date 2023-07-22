import {createBox} from '@shopify/restyle';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Theme} from '../../../theme';
import {ComponentProps} from 'react';

const Icon = createBox<Theme, ComponentProps<typeof MaterialCommunityIcons>>(
  MaterialCommunityIcons,
);

export default Icon;
