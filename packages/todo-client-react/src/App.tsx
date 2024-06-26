import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { HeaderContainer, TabContainer } from '@containers';
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

    & > span {
      background: #ffffff;
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
`;

// const apiClient = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  // usePullToRefresh(ref);

  return (
    <MainLayout2 className="App" ref={ref}>
      <div className="refresh-spinner">
        <CircularProgress />
      </div>
      <React.Suspense fallback="">
        <div>
          <HeaderContainer />
          <MainLayout>
            <AppRoutes location={location} />
          </MainLayout>
          <TabContainer />
        </div>
      </React.Suspense>
    </MainLayout2>
  );
};

export default App;
