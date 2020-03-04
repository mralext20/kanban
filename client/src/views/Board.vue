<template>
  <div class="board container-fluid">
    <div class="row text-center">
      <div class="col-12 text-dark">
        <div class="card mx-auto">
          <div class="card-header">
            <span v-if="board.title">Title: {{board.title}}</span>
            <span v-else>This board has no title!</span>
          </div>
          <div class="card-header">
            <span v-if="board.description">Description: {{board.description}}</span>
            <span v-else>This board has no description!</span>
          </div>
          <ul class="list-group list-group-flush bg-dark">
            <li>
              <form @submit.prevent="addList" class="form-inline">
                <button
                  type="submit"
                  class="btn btn-sm btn-secondary mx-auto mr-3 my-2"
                >Create New List</button>
                <input
                  class="form-control mx-auto my-2"
                  type="text"
                  name="title"
                  placeholder="List Title..."
                  v-model="newList.title"
                  required
                />
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition-group class="row" name="fade" mode="out-in">
      <list v-for="list in board.lists" :key="list._id" :listData="list" />
    </transition-group>
  </div>
</template>

<script>
import List from "../components/ListComponent";
export default {
  name: "Board",
  data() {
    return {
      newList: { boardId: this.$route.params.boardId, title: "" }
    };
  },
  mounted() {
    if (!this.$store.state.boards.length) {
      this.$store.dispatch("getBoardById", this.$route.params.boardId);
    } else {
      this.$store.dispatch(
        "setActiveBoard",
        this.$store.state.boards.find(b => b.id == this.$route.params.boardId)
      );
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
    }
  },
  components: {
    List
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

.board {
  overflow-x: hidden;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .card {
    width: auto;
  }

  .form-control {
    margin: 1rem !important;
  }

  .btn {
    margin-top: 1rem !important;
    margin-bottom: 0 !important;
  }
}
/* devices larger than 600px */
@media only screen and (min-width: 600px) {
  .card {
    width: 30rem;
  }
}
</style>