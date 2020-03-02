<template>
  <div class="boards container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Your Boards</h2>
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" />
          <button type="submit">Create Board</button>
        </form>
        <h3
          class="pt-5"
          v-if="!boards"
        >Looks pretty empty here huh? Once you start adding some boards they will appear below!</h3>
      </div>
      <div class="col-12 text-center pt-3">
        <div class="card mx-auto" style="width: 18rem;">
          <div class="card-header text-dark">Your Boards</div>

          <ul class="list-group list-group-flush">
            <div v-for="board in boards" :key="board._id">
              <li class="list-group-item">
                <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>

<style scoped>
</style>