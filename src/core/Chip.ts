import {createBox} from '@shopify/restyle';
import {Chip as PChip, ChipProps} from 'react-native-paper';
import {Theme} from '@/theme';

const Chip = createBox<Theme, Omit<ChipProps, 'theme'>>(PChip);

export default Chip;
