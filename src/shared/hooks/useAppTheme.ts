import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';

const useAppTheme = useTheme<Theme>;

export default useAppTheme;
