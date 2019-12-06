<template>
  <ul>
    <h4>{{ title }}</h4>
    <li v-for="(task, index) in tasks" :key="index">
      <input type="checkbox" :checked="task.status" disabled/>
      <label>{{ task.name }}</label>
      <button @click="toggleTask(task, true)">toggle</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    title: String,
    tasks: Array,
    toggleTask: Function,
  }
}
</script>
<style scoped>
</style>