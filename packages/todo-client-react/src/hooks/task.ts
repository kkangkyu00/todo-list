import { getTasks, postTask, putTask, deleteTask, getTask, ITask } from '@apis';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTasks = () => useQuery({ queryKey: ['getTasks'], queryFn: getTasks });

export const useTask = (taskIdx: number) =>
  useQuery({
    queryKey: ['getTask', taskIdx],
    queryFn: async () => getTask(taskIdx),
    enabled: !!taskIdx
  });

export const useSaveTask = () =>
  useMutation({ mutationKey: ['postTask'], mutationFn: (params: ITask) => postTask(params) });

export const usePutTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['putTask'],
    mutationFn: ({ taskIdx, params }: { taskIdx: number; params: ITask }) => putTask(taskIdx, params),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['getTask'] });
    }
  });
};

export const useDeleteTask = () =>
  useMutation({ mutationKey: ['deleteTask'], mutationFn: (taskIdx: number) => deleteTask(taskIdx) });
