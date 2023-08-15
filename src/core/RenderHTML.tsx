import React, {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import RNRenderHTML, {
  CSSPropertyNameList,
  RenderHTMLProps,
} from 'react-native-render-html';
import {useAppTheme} from '@/hooks';

const ignoredStyles: CSSPropertyNameList = [
  'backgroundColor',
  'color',
  'fontSize',
  'fontVariant',
];

const RenderHTML = ({source, ...rest}: RenderHTMLProps) => {
  const {width} = useWindowDimensions();

  const {textVariants, colors} = useAppTheme();

  const tagsStyles = useMemo(() => {
    return {
      div: textVariants.bodyMedium,
      span: textVariants.bodyMedium,
      li: textVariants.bodyMedium,
      label: textVariants.bodyMedium,
      p: textVariants.bodyMedium,
    };
  }, [textVariants.bodyMedium]);

  return (
    <RNRenderHTML
      source={source}
      defaultTextProps={{
        style: {
          color: colors.onSurface,
        },
      }}
      contentWidth={width}
      tagsStyles={tagsStyles}
      ignoredStyles={ignoredStyles}
      {...rest}
    />
  );
};

export default React.memo(RenderHTML);
