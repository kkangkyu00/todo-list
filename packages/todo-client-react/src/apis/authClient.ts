import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'todo-server-node',
  headers: { 'Content-Type': 'application/json' }
});
