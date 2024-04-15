import React from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderContainer, TabContainer } from '@containers';

import AppRoutes from './routes';
import './App.css';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <HeaderContainer />
      <div>Starting App</div>
      <AppRoutes location={location} />
      <TabContainer />
    </div>
  );
};

export default App;
