import {Theme} from '@/theme';
import {useTheme} from '@shopify/restyle';

const useAppTheme = useTheme<Theme>;

export default useAppTheme;
