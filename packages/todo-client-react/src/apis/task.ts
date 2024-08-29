import { apiClient } from './authClient';

export interface ITask {
  title?: string;
  description?: string;
  startDate: string;
  endDate: string;
  priority?: 'LOW' | 'MIDDLE' | 'HIGH';
}

export const getTasks = async () => {
  const { data } = await apiClient.get('/api/v1/task');
  return data;
};

export const getTask = async (taskIdx: number) => {
  const { data } = await apiClient.get(`/api/v1/task/${taskIdx}`);
  return data;
};

export const postTask = async (params: ITask) => {
  await apiClient.post('/api/v1/task', params);
};

export const putTask = async (taskIdx: number, params: ITask) => {
  const { data } = await apiClient.put(`/api/v1/task/${taskIdx}`, params);
  return data;
};

export const deleteTask = async (taskIdx: number) => {
  await apiClient.delete(`/api/v1/task/${taskIdx}`);
};
