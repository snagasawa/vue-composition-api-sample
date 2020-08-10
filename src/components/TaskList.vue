<template>
  <div>
    <div>
      <input v-model="taskName" type="text" />
      <button @click="addTask">Add</button>
    </div>
    <div><input v-model="searchText" type="text" />Search</div>
    <div class="task-list-wrapper">
      <ul>
        <h4>DOING</h4>
        <li v-for="(task, index) in doingTasks" :key="index">
          <input type="checkbox" :checked="task.status" disabled />
          <label>{{ task.name }}</label>
          <button @click="toggleTask(task, true)">toggle</button>
        </li>
      </ul>
      <ul>
        <h4>COMPLETED</h4>
        <li v-for="(task, index) in completedTasks" :key="index">
          <input type="checkbox" :checked="task.status" disabled />
          <label>{{ task.name }}</label>
          <button @click="toggleTask(task, false)">toggle</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Task } from '../types';

interface Data {
  taskName: string;
  searchText: string;
  tasks: Task[];
}

export default Vue.extend({
  data: (): Data => {
    return {
      taskName: '',
      searchText: '',
      tasks: [],
    };
  },
  computed: {
    doingTasks(): Task[] {
      return this.searchedTasks.filter(t => !t.status);
    },
    completedTasks(): Task[] {
      return this.searchedTasks.filter(t => t.status);
    },
    searchedTasks(): Task[] {
      return this.tasks.filter(t => t.name.includes(this.searchText));
    },
  },
  methods: {
    addTask() {
      this.tasks.push({
        name: this.taskName,
        status: false,
      });
      this.taskName = '';
    },
    toggleTask(task: Task, status: boolean) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1, { ...task, status: status });
    },
  },
});
</script>
<style scoped>
.task-list-wrapper {
  display: flex;
  justify-content: center;
}
</style>
