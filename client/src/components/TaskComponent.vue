<template>
  <li class="task">
    {{taskData.body}}
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
      <button
        class="btn btn-secondary btn-sm my-1"
        type="button"
        data-toggle="collapse"
        :data-target="`#collapse-form-${taskData.id}`"
      >add comment</button>
      <div class="collapse" :id="`collapse-form-${taskData.id}`">
        <form class="form-group py-2" @submit="addComment">
          <input type="text" class="form-controlform-control-sm" v-model="newComment.body" />
          <button class="btn btn-sm btn-secondary" type="submit">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
      <button
        v-if="taskData.comments.length > 0"
        class="btn btn-secondary btn-sm my-1"
        type="button"
        data-toggle="collapse"
        :id="`button-collapse-${taskData.id}`"
        :data-target="`#collapse-${taskData.id}`"
      >View {{taskData.comments.length}} Comment{{taskData.comments.length == 1 ? "": "s"}}</button>
      <div class="row">
        <div class="col">
          <div class="col collapse" :id="`collapse-${taskData.id}`">
            <div
              v-for="comment in taskData.comments"
              :key="comment.id"
              :class="{show:showingComment}"
            >
              {{comment.body}}
              <button class="btn btn-danger" @click="deleteComment(comment)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>



<script>
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      showNewComment: false,
      showingComment: false,
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
    deleteComment(comment) {
      this.$store.dispatch("deleteComment", {
        comment: comment,
        task: this.taskData
      });
    },
    addComment() {
      this.$store.dispatch("addComment", {
        newComment: { ...this.newComment },
        listId: this.taskData.listId
      });
      this.newComment.body = "";
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  }
};
</script>

<style>
</style>