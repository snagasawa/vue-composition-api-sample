import { computed, Ref } from '@vue/composition-api';
import { Task } from '@/types';

export default function useFilter(tasksRef: Ref<Task[]>) {
  const doingTasks = computed(() => tasksRef.value.filter(t => !t.status));
  const completedTasks = computed(() => tasksRef.value.filter(t => t.status));

  return {
    doingTasks,
    completedTasks,
  };
}
