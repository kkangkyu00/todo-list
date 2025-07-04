import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Box } from '@mui/material';
import { HeaderContainer, TabBarContainer } from '@containers';
import AppRoutes from '@routes';

import './App.css';

const MainLayout = styled(Box)`
  max-width: 600px;
  margin: 44px auto 0;
`;

const App = () => {
  const location = useLocation();
  return (
    <React.Suspense fallback="">
      <MainLayout>
        {/* Header */}
        <HeaderContainer />
        <AppRoutes location={location} />
        {/* Navigation Bar */}
        <TabBarContainer />
      </MainLayout>
    </React.Suspense>
  );
};

export default App;
