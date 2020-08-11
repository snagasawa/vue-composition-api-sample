import { Task } from '@/types';
import { Ref } from '@vue/composition-api';

export default function useAddingTask(tasksRef: Ref<Task[]>) {
  const addTask = (taskName: string) => {
    console.log('use-adding-task', taskName);
    tasksRef.value.push({
      name: taskName,
      status: false,
    });
  };

  return {
    addTask,
  };
}
