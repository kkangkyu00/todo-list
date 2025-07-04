import React, { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from '@hooks';
import { lightTheme, darkTheme } from '@styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultValue = {
  theme: 'light',
  onChangeTheme: () => {}
};

export const ThemeContext = React.createContext(defaultValue);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeProps = useTheme();
  const theme: DefaultTheme = themeProps.theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={themeProps}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
