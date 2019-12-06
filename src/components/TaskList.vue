<template>
  <div>
    <div>
      <add-task :addTask="addTask"></add-task>
    </div>
    <div>
      <input type="text" v-model="searchTextRef" />Search
    </div>
    <div class="task-list-wrapper">
      <task-row title="DOING" :tasks="doingTasks" :toggleTask="toggleTask"></task-row>
      <task-row title="COMPLETED" :tasks="completedTasks" :toggleTask="toggleTask"></task-row>
    </div>
  </div>  
</template>

<script>
import TaskRow from '../components/TaskRow'
import AddTask from '../components/AddTask'

import useFilter from '../composables/use-filter';
import useSearcher from '../composables/use-searcher';
import useAddingTask from '../composables/use-adding-task';
import useTaskList from '../composables/use-task-list';

export default {
  components: {
    TaskRow,
    AddTask,
  },
  setup() {
    const { tasksRef, toggleTask } = useTaskList();
    const { addTask } = useAddingTask(tasksRef);
    const { searchTextRef, search } = useSearcher(tasksRef);
    const { doingTasks, completedTasks } = useFilter(search); 

    return {
      // Mutable state
      tasksRef,
      searchTextRef,
      // Functions
      addTask,
      toggleTask,
      // Computed
      doingTasks,
      completedTasks,
    }
  }
}
</script>
<style scoped>
.task-list-wrapper {
  display: flex;
  justify-content: center;
}
</style>