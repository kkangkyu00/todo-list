import { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { lightColor, palette, typography } from '@styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: { [key in lightColor]: string };
    palette: { [key in palette]: string };
    typography: { [key in typography]: FlattenSimpleInterpolation | FlattenInterpolation };
  }
}
