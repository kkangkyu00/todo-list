import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: { [key in color]: string };
  }
}
