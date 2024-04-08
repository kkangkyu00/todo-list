import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes';

import './App.css';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <div>Starting App</div>
      <AppRoutes location={location} />
    </div>
  );
}

export default App;
