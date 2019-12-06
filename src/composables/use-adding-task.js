import { ref } from '@vue/composition-api';

export default function useAddingTask(tasksRef) {
  const taskNameRef = ref('');

  const addTask = () => {
    tasksRef.value.push({
      name: taskNameRef.value,
      status: false,
    });
    taskNameRef.value = '';
  }

  return {
    taskNameRef,
    addTask,
  };
}

