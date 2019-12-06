<template>
  <div>
    <input type="text" v-model="taskNameRef" />
    <button @click="addTask(taskNameRef)">Add</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api';

export default {
  props: {
    addTask: Function,
  },
  setup() {
    const taskNameRef = ref('');

    return {
      taskNameRef,
    };
  }
}
</script>
<style scoped>
</style>