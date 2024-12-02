import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "GowunDodum-Regular";
    font-weight: normal;
    src: url("./fonts/GowunDodum-Regular.ttf") format("truetype");
  }
  body {
    // Font Style
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #202124;
  }
`;

export default GlobalStyle;
