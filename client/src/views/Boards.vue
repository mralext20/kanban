<template>
  <div class="boards container-fluid">
    <!-- Form Column -->
    <div class="col-12">
      <div class="row">
        <div class="col-12">
          <h2>Your Boards</h2>
        </div>
        <div class="col-4"></div>
        <div class="col-md-4">
          <div class="form-row">
            <form class="form-inline" @submit.prevent="addBoard">
              <div class="col-md-4">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder="Board Title..."
                  v-model="newBoard.title"
                  required
                />
              </div>
              <div class="col-md-4 my-1">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder="Board Description..."
                  v-model="newBoard.description"
                />
              </div>
              <div class="col-md-4">
                <button class="btn btn-secondary btn-sm" type="submit">Create Board</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-4"></div>
      </div>
      <h3
        class="pt-5"
        v-if="!boards"
      >Looks pretty empty here huh? Once you start adding some boards they will appear below!</h3>
    </div>
    <!-- Board -->
    <div class="col-12">
      <transition-group tag="div" class="row" name="fade" mode="out-in">
        <div class="col-md-3 py-3" v-for="board in boards" :key="board._id">
          <div class="card mx-auto my-3">
            <router-link :to="{name: 'board', params: {boardId: board._id}}">
              <div title="View Board Details" class="card-header text-dark">{{ board.title }}</div>
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
  name: "Boards",
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
    },
    setActive() {
      this.$store.dispatch("setActiveBoard", this.boardData);
    }
  },
  components: {}
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

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .form-control {
    margin: auto !important;
    margin-top: 0.3rem !important;
  }
}

a {
  text-decoration: none;
}

.form-control {
  width: 10rem;
}

.card {
  opacity: 90%;
  height: 6.8rem;
  width: auto !important;
}

.card-header:hover {
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease !important;
  background-color: rgb(75, 75, 75) !important;
  color: white !important;
  text-decoration: none !important;
}

.card-header {
  transition: background-color 0.5s ease, color 0.5s ease !important;
}
</style>