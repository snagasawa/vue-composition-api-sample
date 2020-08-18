<template>
  <ul>
    <h4>{{ title }}</h4>
    <li v-for="(task, index) in tasks" :key="index">
      <input type="checkbox" :checked="task.status" disabled />
      <label>{{ task.name }}</label>
      <button @click="toggleTask(task)">toggle</button>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, toRefs, PropType } from '@vue/composition-api';
import { Task } from '@/types';

export default defineComponent({
  props: {
    title: { type: String, required: true },
    tasks: { type: Array as PropType<Task[]>, required: true },
  },
  setup(props, context) {
    const toggleTask = (task: Task) => {
      context.emit('toggle-task', task);
    };

    return {
      toggleTask,
    };
  },
});
</script>
<style scoped></style>
