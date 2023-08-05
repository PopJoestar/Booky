import {Theme} from '@/theme';
import {createBox} from '@shopify/restyle';
import {Surface as RNSurface, SurfaceProps} from 'react-native-paper';

const Surface = createBox<Theme, SurfaceProps>(RNSurface);

export default Surface;
