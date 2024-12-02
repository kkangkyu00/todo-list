import { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { color, palette, typography } from '@styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: { [key in color]: string };
    palette: { [key in palette]: string };
    typography: { [key in typography]: FlattenSimpleInterpolation | FlattenInterpolation };
  }
}
