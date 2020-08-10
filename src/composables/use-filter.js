import { computed } from '@vue/composition-api';

export default function useFilter(tasksRef) {
  const doingTasks = computed(() => tasksRef.value.filter(t => !t.status));
  const completedTasks = computed(() => tasksRef.value.filter(t => t.status));

  return {
    doingTasks,
    completedTasks,
  };
}
