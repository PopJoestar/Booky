import {createBox} from '@shopify/restyle';
import {Theme} from '@/theme';
import {ImageProps, Image as RNImage} from 'expo-image';

const Image = createBox<Theme, ImageProps>(RNImage);

export default Image;
