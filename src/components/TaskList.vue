<template>
  <div>
    <div>
      <input type="text" v-model="state.taskName" />
      <button @click="addTask">Add</button>
    </div>
    <div>
      <input type="text" v-model="state.searchText" />Search
    </div>
    <div class="task-list-wrapper">
      <ul>
        <h4>DOING</h4>
        <li v-for="(task, index) in state.doingTasks" :key="index">
          <input type="checkbox" :checked="task.status" disabled/>
          <label>{{ task.name }}</label>
          <button @click="toggleTask(task, true)">toggle</button>
        </li>
      </ul>
      <ul>
        <h4>COMPLETED</h4>
        <li v-for="(task, index) in state.completedTasks" :key="index">
          <input type="checkbox" :checked="task.status" disabled/>
          <label>{{ task.name }}</label>
          <button @click="toggleTask(task, false)">toggle</button>
        </li>
      </ul>
    </div>
  </div>  
</template>

<script>
import { reactive, computed } from '@vue/composition-api';

export default {
  setup() {
    const state = reactive({
      taskName: '',
      searchText: '',
      tasks: [],
      doingTasks: computed(() => state.searchedTasks.filter(t => !t.status)),
      completedTasks: computed(() => state.searchedTasks.filter(t => t.status)),
      searchedTasks: computed(() => state.tasks.filter(t => t.name.includes(state.searchText))),
    });

    function addTask() {
      state.tasks.push({
        name: state.taskName,
        status: false,
      });
      state.taskName = '';
    }

    function toggleTask(task, status) {
      const index = state.tasks.indexOf(task);
      state.tasks.splice(index, 1, { ...task, status: status });
    }

    return {
      state,
      addTask,
      toggleTask
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