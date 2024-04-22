import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const TasksPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>asdasdasd</div>
      <Button onClick={() => navigate('/addTask')}>asd</Button>
    </div>
  );
};

export default TasksPage;
