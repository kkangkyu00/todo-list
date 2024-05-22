import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderContainer, TabContainer } from '@containers';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import AppRoutes from './routes';
import './App.css';

const MainLayout = styled.div`
  height: 100%;
  //padding: 0px 16px;
`;

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

const getTodos = async () => {
  const param = {
    signId: 'as7895644',
    password: 'kyuseok1!'
  };
  const { data } = await apiClient.post(`/user/register`, param);
  return data;
};

const App = () => {
  const location = useLocation();
  const { data } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  console.log(data, '############');

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
