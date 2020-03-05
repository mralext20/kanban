<template>
  <li class="task">
    {{taskData.body}}
    <!-- Move to -->
    <div class="dropdown">
      <button
        v-if="Object.keys(board.lists).length > 1"
        class="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >Move To..</button>
      <div class="dropdown-menu">
        <button
          v-for="list in board.lists"
          :key="list.id"
          v-show="list.id != taskData.listId"
          class="dropdown-item"
          @click="moveTo(list.id)"
        >{{list.title}}</button>
      </div>
      <!-- End Move to -->
      <!-- Comments Button -->
      <div id="comment-group" class="btn-group dropright">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle caret-off py-0 px-1"
          data-toggle="dropdown"
        >
          <i class="far fa-comments"></i>
        </button>
        <div
          id="comment-menu row"
          class="dropdown-menu text-center"
          :class="{slideRight:left, slideLeft:!left}"
        >
          <div class="col-12">
            <h6 class="dropdown-header">Comments</h6>
            <ul>
              <div class="row">
                <li class="list-group-item">
                  <form @submit.prevent="addComment" class="form-inline">
                    <div class="col-9">
                      <input
                        v-model="newComment.body"
                        class="form-control comment-input form-control-sm"
                        type="text"
                        placeholder="Comment..."
                      />
                    </div>

                    <div class="col-3">
                      <button type="submit" class="btn-sm btn-secondary add-comment-button">
                        <i class="fas fa-plus-square"></i>
                      </button>
                    </div>
                  </form>
                </li>
              </div>
              <transition-group class="row" name="fade" mode="out-in">
                <li
                  class="list-group-item comment col-12"
                  v-for="comment in taskData.comments"
                  :key="comment.id"
                >
                  <span class="mr-auto">{{shortenComment(comment.body, 30)[0]}}</span>
                  <button
                    class="btn btn-sm btn-danger ml-auto py-1 px-2"
                    @click="deleteComment(comment)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </li>
              </transition-group>
            </ul>
          </div>
          <!-- Dropdown menu links -->
        </div>
      </div>

      <!-- View Comments Button -->
    </div>
  </li>
</template>



<script>
import NotificationService from "../NotificationService";
export default {
  name: "Task",
  props: ["taskData", "left"],
  data() {
    return {
      showNewComment: false,
      newComment: {
        body: "",
        taskId: this.taskData.id
      }
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData.id);
    },
    moveTo(listId) {
      this.$store.dispatch("moveTasks", {
        task: this.taskData,
        target: listId
      });
    },
    async deleteComment(comment) {
      if (
        await NotificationService.confirmAction(
          "Are you sure you want to delete this comment?"
        )
      ) {
        this.$store.dispatch("deleteComment", {
          comment: comment,
          task: this.taskData
        });
        NotificationService.toast("Successfully deleted!");
      }
    },
    addComment() {
      this.$store.dispatch("addComment", {
        newComment: { ...this.newComment },
        listId: this.taskData.listId
      });
      this.newComment.body = "";
    },
    shortenComment(str, num) {
      let input = str.split(" ");
      let ret = [];
      let temp = "";
      input.forEach((word, index) => {
        if (word.length + temp.length + 1 < num) {
          temp = `${temp}${word} `;
        } else {
          ret.push(temp);
          temp = `${word} `;
        }
      });
      if (temp != "") {
        ret.push(temp);
      }
      return ret;
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}

#comment-menu .comment {
  width: 30rem;
}

.comment-input {
  width: auto;
}

.slideRight.dropdown-menu {
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateX(-50px) !important;
  transition: 0.2s ease all;
}
.slideRight.dropdown-menu.show {
  display: block;
  visibility: visible;
  opacity: 1;
  transform: translate(50px) !important;
  transition: 0.2s ease all;
}

.slideLeft.dropdown-menu {
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateX(50px) !important;
  transition: 0.2s ease all;
}
.slideLeft.dropdown-menu.show {
  display: block;
  visibility: visible;
  opacity: 1;
  transform: translate(-350px) !important;
  transition: 0.2s ease all;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px) !important;
}

.add-comment-button:hover {
  background-color: rgb(0, 110, 0);
}

.caret-off::before {
  display: none;
}
.caret-off::after {
  display: none;
}
</style>