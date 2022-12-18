import React from 'react';
import {useWindowDimensions} from 'react-native';
import RNRenderHTML, {RenderHTMLProps} from 'react-native-render-html';
import {useAppTheme} from '../../hooks';

const RenderHTML = ({source, ...rest}: RenderHTMLProps) => {
  const {width} = useWindowDimensions();

  const {textVariants, colors} = useAppTheme();
  const tagStyle = {...textVariants.bodyLarge, color: colors.onSurface};
  return (
    <RNRenderHTML
      source={source}
      contentWidth={width}
      tagsStyles={{
        div: tagStyle,
        span: tagStyle,
        li: tagStyle,
        label: tagStyle,
        p: tagStyle,
      }}
      ignoredStyles={['backgroundColor', 'color', 'fontSize', 'fontVariant']}
      {...rest}
    />
  );
};

export default React.memo(RenderHTML);
