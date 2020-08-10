import { ref } from '@vue/composition-api';

export default function useTaskList() {
  const tasksRef = ref([]);

  const toggleTask = (task, status) => {
    const index = tasksRef.value.indexOf(task);
    tasksRef.value.splice(index, 1, { ...task, status: status });
  };

  return {
    tasksRef,
    toggleTask,
  };
}
