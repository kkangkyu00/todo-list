import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
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
dayjs.extend(isToday);
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
