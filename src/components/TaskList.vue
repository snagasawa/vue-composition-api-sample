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
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  ComputedRef,
  toRef,
} from '@vue/composition-api';
import { Task } from '../types';

interface Data {
  taskName: string;
  searchText: string;
  tasks: Task[];
}

export default defineComponent({
  setup() {
    const state = reactive<Data>({
      taskName: '',
      searchText: '',
      tasks: [],
    });

    const filterTasksByName = (
      tasks: ComputedRef<Task[]>,
      text: ComputedRef<string>
    ) =>
      computed(() => {
        return tasks.value.filter(t => t.name.includes(text.value));
      });

    const filterDoingTasks = (tasks: ComputedRef<Task[]>) =>
      computed(() => {
        return tasks.value.filter(t => !t.status);
      });

    const filterComputedTasks = (tasks: ComputedRef<Task[]>) =>
      computed(() => {
        return tasks.value.filter(t => t.status);
      });

    const searchedTasks = filterTasksByName(
      toRef(state, 'tasks'),
      toRef(state, 'searchText')
    );
    const doingTasks = filterDoingTasks(searchedTasks);
    const completedTasks = filterComputedTasks(searchedTasks);

    const addTask = () => {
      state.tasks.push({
        name: state.taskName,
        status: false,
      });
      state.taskName = '';
    };

    const toggleTask = (task: Task, status: boolean) => {
      const index = state.tasks.indexOf(task);
      state.tasks.splice(index, 1, { ...task, status: status });
    };

    return {
      ...toRefs(state),
      addTask,
      toggleTask,
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
