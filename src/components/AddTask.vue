<template>
  <div>
    <input v-model="taskNameRef" type="text" />
    <button @click="addTask(taskNameRef)">Add</button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from '@vue/composition-api';

export default defineComponent({
  setup(_props, context) {
    const taskNameRef = ref('');

    const addTask = (taskName: string) => {
      context.emit('add-task', taskName);
    };

    return {
      taskNameRef,
      addTask,
    };
  },
});
</script>
<style scoped></style>
