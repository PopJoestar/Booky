import {createBox} from '@shopify/restyle';
import {ButtonProps, Button as PButton} from 'react-native-paper';
import {Theme} from '@/theme';

const Button = createBox<Theme, Omit<ButtonProps, 'theme'>>(PButton);

export default Button;
