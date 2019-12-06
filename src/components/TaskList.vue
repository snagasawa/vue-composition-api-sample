<template>
  <div>
    <div>
      <input type="text" v-model="taskNameRef" />
      <button @click="addTask">Add</button>
    </div>
    <div>
      <input type="text" v-model="searchTextRef" />Search
    </div>
    <div class="task-list-wrapper">
      <ul>
        <h4>DOING</h4>
        <li v-for="(task, index) in doingTasks" :key="index">
          <input type="checkbox" :checked="task.status" disabled/>
          <label>{{ task.name }}</label>
          <button @click="toggleTask(task, true)">toggle</button>
        </li>
      </ul>
      <ul>
        <h4>COMPLETED</h4>
        <li v-for="(task, index) in completedTasks" :key="index">
          <input type="checkbox" :checked="task.status" disabled/>
          <label>{{ task.name }}</label>
          <button @click="toggleTask(task, false)">toggle</button>
        </li>
      </ul>
    </div>
  </div>  
</template>

<script>
import useFilter from '../composables/use-filter';
import useSearcher from '../composables/use-searcher';
import useAddingTask from '../composables/use-adding-task';
import useTaskList from '../composables/use-task-list';

export default {
  setup() {
    const { tasksRef, toggleTask } = useTaskList();
    const { taskNameRef, addTask } = useAddingTask(tasksRef);
    const { searchTextRef, search } = useSearcher(tasksRef.value);
    const { doingTasks, completedTasks } = useFilter(search); 

    return {
      // Mutable state
      tasksRef,
      taskNameRef,
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