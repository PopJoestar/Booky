import {createBox} from '@shopify/restyle';
import {Theme} from '@/theme';
import {
  TextInput as PTextInput,
  TextInputProps as PTextInputProps,
} from 'react-native-paper';

const TextInput = createBox<Theme, Omit<PTextInputProps, 'theme'>>(PTextInput);

export default TextInput;
