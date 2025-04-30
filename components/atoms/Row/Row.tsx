import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';

export const Row = createBox<Theme>();

Row.defaultProps = {
  flexDirection: 'row',
};
