<template>
  <li>{{taskData.body}}</li>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      newComment: {}
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData.id);
    }
  }
};
</script>

<style>
</style>