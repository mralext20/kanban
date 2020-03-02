<template>
  <div class="board container-fluid">
    <div class="row text-center">
      <div class="col-12 text-dark">
        <div class="card mx-auto" style="width: 30rem;">
          <div class="card-header">
            <span v-if="board.title">{{board.title}}</span>
            <span v-else>This board has no title!</span>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">List 1</li>
            <li class="list-group-item">List 2</li>
            <li class="list-group-item">List 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  props: ["boardId"]
};
</script>

<style >
</style>