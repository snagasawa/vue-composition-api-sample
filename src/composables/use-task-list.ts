import { ref } from '@vue/composition-api';
import { Task } from '@/types';

declare function toggleStatus(): boolean;

export default function useTaskList() {
  const tasksRef = ref<Task[]>([]);

  const toggleTask = (toggle: typeof toggleStatus) => (task: Task) => {
    const index = tasksRef.value.indexOf(task);
    tasksRef.value.splice(index, 1, { ...task, status: toggle() });
  };

  return {
    tasksRef,
    toggleTask,
  };
}
