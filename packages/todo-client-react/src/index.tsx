import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'dayjs/locale/ko';
import './index.css';

dayjs.locale('ko');
dayjs.extend(duration);
dayjs.extend(isToday);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();
