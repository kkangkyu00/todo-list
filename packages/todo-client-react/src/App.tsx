import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderContainer, TabContainer } from '@containers';
import AppRoutes from './routes';
import './App.css';

const MainLayout = styled.div`
  //height: 100%;
  //padding: 0px 16px;
`;

// const apiClient = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <React.Suspense fallback="">
        <>
          <HeaderContainer />
          <MainLayout>
            <AppRoutes location={location} />
          </MainLayout>
          <TabContainer />
        </>
      </React.Suspense>
    </div>
  );
};

export default App;
