<template>
  <div class="col col-md-3 pt-4">
    <div class="card text-dark">
      <div class="card-header">{{listData.title}}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Task one</li>
        <li class="list-group-item">Task two</li>
        <li class="list-group-item">Task three</li>
      </ul>
    </div>
  </div>
</template>

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

<style scoped>
.card {
  width: 5rem !important;
}
</style>