import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderContainer, TabBarContainer } from '@containers';
// import { usePullToRefresh } from '@utils';

import AppRoutes from './routes';
import './App.css';

const MainLayout2 = styled.div`
  .refresh-spinner {
    z-index: 100;
    position: fixed;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    transition: 0.3s;
    background: #0c0f12;
    & > span {
      //background: #ffffff;
      border-radius: 50%;
    }
  }
  .refresh-spinner.visible {
    top: 0;
  }
`;

const MainLayout = styled.div`
  //height: 100%;
  //padding: 0px 16px;
  padding-top: 44px;
`;

// const apiClient = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const methods = useForm();
  // usePullToRefresh(ref);

  return (
    <MainLayout2 className="App" ref={ref}>
      <div className="refresh-spinner">
        <CircularProgress />
      </div>
      <React.Suspense fallback="">
        <>
          <HeaderContainer />
          <MainLayout>
            <FormProvider {...methods}>
              <AppRoutes location={location} />
            </FormProvider>
          </MainLayout>
          {/* <TabBarContainer /> */}
        </>
      </React.Suspense>
    </MainLayout2>
  );
};

export default App;
