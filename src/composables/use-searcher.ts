import { computed, ref, Ref } from '@vue/composition-api';
import { Task } from '@/types';

export default function useSearcher(tasksRef: Ref<Task[]>) {
  const searchTextRef = ref('');
  const search = computed(() => {
    return tasksRef.value.filter(t => t.name.includes(searchTextRef.value));
  });

  return {
    searchTextRef,
    search,
  };
}
