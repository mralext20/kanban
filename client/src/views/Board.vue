<template>
  <div class="board container-fluid">
    <div class="row text-center">
      <div class="col-12 text-dark">
        <div class="card mx-auto" style="width: 30rem;">
          <div class="card-header">
            <span v-if="board.title">Title: {{board.title}}</span>
            <span v-else>This board has no title!</span>
          </div>
          <div class="card-header">
            <span v-if="board.description">Description: {{board.description}}</span>
            <span v-else>This has no description!</span>
          </div>
          <ul class="list-group list-group-flush">
            <li>
              <button class="btn btn-sm btn-secondary my-2">Create New List</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row text-center"></div>
  </div>
</template>

<script>
import List from "../components/ListComponent";
export default {
  name: "Board",
  mounted() {
    if (!this.$store.state.boards.length) {
      this.$store.dispatch("getBoardById", this.$route.params.boardId);
    } else {
      this.$store.dispatch(
        "setActiveBoard",
        this.$store.state.boards.find(b => b.id == this.$route.params.boardId)
      );
      console.log("Active board: ", this.$store.state.activeBoard);
    }
  },
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  components: {
    List
  }
};
</script>

<style >
</style>