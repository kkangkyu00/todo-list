import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import { ThemeProvider } from 'styled-components';
// import theme from '@styles/theme';
import GlobalStyle from '@styles/globalStyle';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'dayjs/locale/ko';
import ThemeProvider from './context/ThemeContext';

dayjs.locale('ko');
dayjs.extend(duration);
dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();
