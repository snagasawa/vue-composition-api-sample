import { ref } from '@vue/composition-api';
import { Task } from '@/types';

export default function useTaskList() {
  const tasksRef = ref<Task[]>([]);

  const toggleTask = (task: Task, status: boolean) => {
    const index = tasksRef.value.indexOf(task);
    tasksRef.value.splice(index, 1, { ...task, status: status });
  };

  return {
    tasksRef,
    toggleTask,
  };
}
