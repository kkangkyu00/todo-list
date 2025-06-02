import React, { ReactNode } from 'react';
import styled, { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from '@hooks';
import { lightTheme, darkTheme } from '@styles/theme';

const ThemeWrapper = styled.div`
  background: ${({ theme }) => theme.color.background};
`;

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
      <StyledThemeProvider theme={theme}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
