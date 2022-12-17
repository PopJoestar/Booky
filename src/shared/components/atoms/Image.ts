import {Image as RNImage, ImageProps} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';

const Image = createBox<Theme, ImageProps>(RNImage);

export default Image;
