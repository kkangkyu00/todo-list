import React from 'react';
import { Location, Routes, Route, Outlet } from 'react-router-dom';

const HomePage = React.lazy(() => import('@pages/HomePage'));
const TasksPage = React.lazy(() => import('@pages/TasksPage'));
const TaskAddPage = React.lazy(() => import('@pages/TaskAddPage'));
const FeelingCheckPage = React.lazy(() => import('@pages/FeelingCheckPage'));

interface AppRouteProps {
  location: Location;
}

const AppRoutes = ({ location }: AppRouteProps) => {
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Outlet />}>
        <Route index path="/main" element={<HomePage />} />
        <Route index path="/tasks" element={<TasksPage />} />
        <Route index path="/taskAdd" element={<TaskAddPage />} />
        <Route index path="/feeling" element={<FeelingCheckPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
