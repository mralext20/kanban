<template>
  <div class="boards container-fluid">
    <div class="row">
      <!-- Form Column -->
      <div class="col-12">
        <h2>Your Boards</h2>
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="Board Title..." v-model="newBoard.title" required />
          <input type="text" placeholder="Board Description..." v-model="newBoard.description" />
          <button type="submit">Create Board</button>
        </form>
        <h3
          class="pt-5"
          v-if="!boards"
        >Looks pretty empty here huh? Once you start adding some boards they will appear below!</h3>
      </div>
      <!-- Board -->
      <transition-group tag="div" name="fade" mode="out-in">
        <div class="col-3 pt-3" v-for="board in boards" :key="board._id">
          <div class="card mx-auto" style="width: 18rem;">
            <router-link :to="{name: 'board', params: {boardId: board._id}}">
              <div class="card-header text-dark">{{ board.title }}</div>
            </router-link>

            <ul class="list-group list-group-flush">
              <li class="list-group-item text-dark">{{board.description}}</li>
            </ul>
          </div>
        </div>
      </transition-group>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

a {
  text-decoration: none;
}
.card-header:hover {
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease !important;
  background-color: rgb(75, 75, 75) !important;
  color: white !important;
  text-decoration: none !important;
}
</style>