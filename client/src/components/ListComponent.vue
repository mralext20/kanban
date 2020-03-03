<template></template>

<script>
export default {
  name: "List",
  props: ["listData"],
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData.id);
    }
  }
};
</script>

<style>
</style>