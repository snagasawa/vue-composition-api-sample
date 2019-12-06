import { computed, ref, isRef } from '@vue/composition-api';

export default function useFilter(tasks = []) {
  const tasksRef = isRef(tasks) ? tasks : ref(tasks);
  const valid = Array.isArray(tasksRef.value);

  const doingTasks = valid ?
    computed(() => tasksRef.value.filter(t => !t.status)) :
    () => { return [] };
  const completedTasks = valid ?
    computed(() => tasksRef.value.filter(t => t.status)):
    () => { return [] };

  return {
    doingTasks,
    completedTasks,
  };
}
