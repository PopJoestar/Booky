import {
  MessageOptions,
  showMessage as RNShowMessage,
} from 'react-native-flash-message';
import useAppTheme from './useAppTheme';

const useMessageDisplayer = () => {
  const {colors, textVariants} = useAppTheme();

  const showMessage = (options: MessageOptions) => {
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

  return {showMessage};
};

export default useMessageDisplayer;
