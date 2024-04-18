import React from 'react';
import { Location, Routes, Route, Outlet } from 'react-router-dom';

const HomePage = React.lazy(() => import('@pages/HomePage'));

interface AppRouteProps {
  location: Location;
}

const AppRoutes = ({ location }: AppRouteProps) => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Outlet />}>
        <Route index path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
