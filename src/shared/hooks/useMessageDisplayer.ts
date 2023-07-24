import {
  MessageOptions,
  showMessage as RNShowMessage,
} from 'react-native-flash-message';
import useAppTheme from './useAppTheme';
import FlashMessageSuccessIcon from '../components/atoms/FlashMessageSuccessIcon';

const useMessageDisplayer = () => {
  const {colors, textVariants} = useAppTheme();

  const callShowMessage = (options: MessageOptions) => {
    RNShowMessage({
      ...options,
      floating: true,
      backgroundColor: colors.inverseSurface,
      titleStyle: [
        textVariants.bodyMedium,
        {
          color: colors.inverseOnSurface,
        },
      ],
    });
  };

  const showMessage = (
    type: 'success' | 'warning' | 'info',
    options: MessageOptions,
  ) => {
    callShowMessage({
      ...options,
      icon: FlashMessageSuccessIcon,
    });
  };

  return {showMessage};
};

export default useMessageDisplayer;
