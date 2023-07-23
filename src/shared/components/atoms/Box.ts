import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';
import {ComponentProps} from 'react';

const Box = createBox<Theme>();

export type BoxProps = ComponentProps<typeof Box>;
export default Box;
