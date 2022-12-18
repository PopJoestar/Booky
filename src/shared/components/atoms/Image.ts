import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const Image = createBox<Theme, FastImageProps>(FastImage);

export default Image;
