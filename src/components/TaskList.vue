<template>
  <div>
    <div>
      <add-task @add-task="addTask"></add-task>
    </div>
    <div><input v-model="searchTextRef" type="text" />Search</div>
    <div class="task-list-wrapper">
      <task-row
        title="DOING"
        :tasks="doingTasks"
        @toggle-task="completeTask"
      ></task-row>
      <task-row
        title="COMPLETED"
        :tasks="completedTasks"
        @toggle-task="returnToDoingTask"
      ></task-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import TaskRow from '@/components/TaskRow.vue';
import AddTask from '@/components/AddTask.vue';

import useFilter from '@/composables/use-filter';
import useSearcher from '@/composables/use-searcher';
import useAddingTask from '@/composables/use-adding-task';
import useTaskList from '@/composables/use-task-list';

export default defineComponent({
  components: {
    TaskRow,
    AddTask,
  },
  setup() {
    const { tasksRef, toggleTask } = useTaskList();
    const { addTask } = useAddingTask(tasksRef);
    const { searchTextRef, search } = useSearcher(tasksRef);
    const { doingTasks, completedTasks } = useFilter(search);

    const completeTask = toggleTask(() => {
      return true;
    });
    const returnToDoingTask = toggleTask(() => {
      return false;
    });

    return {
      // Mutable state
      tasksRef,
      searchTextRef,
      // Functions
      addTask,
      completeTask,
      returnToDoingTask,
      // Computed
      doingTasks,
      completedTasks,
    };
  },
});
</script>
<style scoped>
.task-list-wrapper {
  display: flex;
  justify-content: center;
}
</style>
