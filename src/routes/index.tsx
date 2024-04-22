import React from 'react';
import { Location, Routes, Route, Outlet } from 'react-router-dom';

const HomePage = React.lazy(() => import('@pages/HomePage'));
const TasksPage = React.lazy(() => import('@pages/TasksPage'));
const AddTaskPage = React.lazy(() => import('@pages/AddTaskPage'));

interface AppRouteProps {
  location: Location;
}

const AppRoutes = ({ location }: AppRouteProps) => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Outlet />}>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/tasks" element={<TasksPage />} />
        <Route index path="/addTask" element={<AddTaskPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
