<template>
  <div class="board container-fluid">
    <div class="row text-center">
      <div class="col-12 text-dark">
        <div class="card mx-auto">
          <div class="card-header">
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6">
                <span v-if="editTitleMode">
                  <form @submit.prevent="editBoardTitle">
                    <input v-model="board.title" />
                  </form>
                </span>
                <span v-else-if="board.title">Title: {{board.title}}</span>
                <span v-else>This board has no title!</span>
              </div>
              <!-- Board options -->
              <div class="col-3">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm dropdown-toggle caret-off"
                  data-toggle="dropdown"
                >
                  <i class="fas fa-cog"></i>
                </button>
                <div class="dropdown-menu text-center">
                  <!-- Dropdown menu links -->
                  <h6 class="dropdown-header">Board Options</h6>
                  <li class="py-1" @click="editTitleMode = !editTitleMode">
                    <i class="fas fa-edit"></i> Edit Board Title
                  </li>
                  <li class="py-1" @click="editDescriptionMode = !editDescriptionMode">
                    <i class="fas fa-edit"></i> Edit Board Description
                  </li>
                  <li id="delete-list" class="py-1" @click="deleteBoard">
                    <i class="fas fa-trash-alt"></i> Delete Board
                  </li>
                </div>
              </div>
              <!-- End Board options -->
            </div>
          </div>
          <div class="card-header">
            <span v-if="editDescriptionMode">
              <form @submit.prevent="editBoardDescription">
                <input v-model="board.description" />
              </form>
            </span>
            <span v-else-if="board.description">Description: {{board.description}}</span>
            <span v-else>This board has no description!</span>
          </div>
          <!-- Add List Group -->
          <ul class="list-group list-group-flush bg-dark">
            <li>
              <form @submit.prevent="addList" class="form-inline">
                <input
                  class="form-control ml-auto my-2"
                  type="text"
                  name="title"
                  placeholder="List Title..."
                  v-model="newList.title"
                  required
                />
                <button
                  type="submit"
                  class="add-list-button btn btn-sm btn-secondary ml-3 mr-auto my-2"
                >
                  <i class="fas fa-plus-square"></i>
                </button>
              </form>
            </li>
          </ul>
          <!-- End Add List Group -->
        </div>
      </div>
    </div>
    <transition-group tag="div" class="row pb-5" name="fade" mode="out-in">
      <list
        v-for="(list, key, index) in board.lists"
        :key="list._id"
        :index="index"
        :listData="list"
      />
    </transition-group>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
import List from "../components/ListComponent";
export default {
  name: "Board",
  data() {
    return {
      editTitleMode: false,
      editDescriptionMode: false,
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
    async deleteBoard() {
      if (
        await NotificationService.confirmAction(
          "Are you sure you want delete this board?"
        )
      ) {
        this.$store.dispatch("deleteBoard", this.board);
        this.$router.push({ path: "/boards" });
        NotificationService.toast("Successfully deleted!");
      }
    },
    addList() {
      this.$store.dispatch("addList", this.newList);
    },
    editBoardTitle() {
      this.$store.dispatch("editBoardTitle", this.board);
      this.editTitleMode = false;
    },
    editBoardDescription() {
      this.$store.dispatch("editBoardDescription", this.board);
      this.editDescriptionMode = false;
    }
  },
  components: {
    List
  }
};
</script>

<style scoped>
.dropdown-menu h6 {
  text-shadow: none;
}

.dropdown-menu li:hover {
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease !important;
  background-color: rgb(75, 75, 75) !important;
  color: white !important;
  text-decoration: none !important;
}

li#delete-list:hover {
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease !important;
  background-color: rgb(177, 0, 0) !important;
  color: white !important;
  text-decoration: none !important;
}

@media only screen and (min-width: 600px) {
  .dropdown-menu {
    display: block;
    visibility: hidden;
    opacity: 0;
    transform: translateX(-50px) rotate(120deg) scale(0) !important;
    transition: 0.25s ease all;
  }
  .dropdown-menu.show {
    display: block;
    visibility: visible;
    opacity: 1;

    transform: translate(150px, 10px) !important;
    transition: 0.25s ease all;
  }
}

@media only screen and (max-width: 600px) {
  .dropdown-menu {
    display: block;
    visibility: hidden;
    opacity: 0;
    transform: translateX(-50px) !important;
    transition: 0.2s ease all;
  }
  .dropdown-menu.show {
    display: block;
    visibility: visible;
    opacity: 1;
    transform: translate(-150px, 50px) !important;
    transition: 0.2s ease all;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.caret-off::before {
  display: none;
}
.caret-off::after {
  display: none;
}

.add-list-button:hover {
  background-color: rgb(0, 110, 0);
}

.board {
  min-height: 92vh;
  overflow-x: hidden;
  opacity: 0.9;
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