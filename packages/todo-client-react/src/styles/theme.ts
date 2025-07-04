import { css } from 'styled-components';

export const palette = {
  a: '#FD4B37',
  b: '#FF8C41',
  c: '#FCD801',
  d: '#2cca90',
  e: '#48dfda',
  f: '#5ac6ed',
  g: '#446BB4',
  h: '#707dc3',
  i: '#959ca4',
  j: '#c9cad7'
};

export const lightColor = {
  background: '#ffffff',
  bgSeparator: '#f2f3f5',
  // Default Font Color
  main: '#202124',
  // Color
  white: '#ffffff',
  black: '#202124',
  grey01: '#e5e5e5',
  grey02: '#888888',
  grey03: '#666666',
  disabled: '#888888'
};
export const darkColor = {
  background: '#161616',
  bgSeparator: '#313131',
  // Default Font Color
  main: '#ebecf0',
  // Color
  white: '#ebecf0',
  black: '#202124',
  grey01: '#e5e5e5',
  grey02: '#888888',
  grey03: '#888B90',
  disabled: '#888888'
};

export const typography = {
  font20R: css`
    font-size: 20px;
    line-height: 22px;
    font-weight: 500;
  `,
  font20B: css`
    font-size: 20px;
    line-height: 22px;
    font-weight: bold;
  `,
  font18R: css`
    font-size: 18px;
    line-height: 20px;
    font-weight: 500;
  `,
  font18B: css`
    font-size: 18px;
    line-height: 20px;
    font-weight: bold;
  `,
  font16R: css`
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
  `,
  font16B: css`
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  `,
  font14R: css`
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
  `,
  font14B: css`
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
  `
};

export const lightTheme = { color: lightColor, palette, typography };

export const darkTheme = { color: darkColor, palette, typography };
