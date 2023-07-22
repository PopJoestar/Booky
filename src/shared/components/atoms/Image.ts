import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';
import {Image as RNIMage} from 'react-native';
import {ImageProps} from 'react-native';

const Image = createBox<Theme, ImageProps>(RNIMage);

export default Image;
