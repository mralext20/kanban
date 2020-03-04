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
        v-if="taskData.comments.length > 0"
        class="btn btn-primary my-1"
        type="button"
        data-toggle="collapse"
        data-target=".multi-collapse"
      >View {{taskData.comments.length}} Comment{{taskData.comments.length == 1 ? "s": ""}}</button>
      <div class="row">
        <div class="col">
          <div class="col">
            <div
              v-for="comment in taskData.comments"
              :key="comment.id"
              class="collapse multi-collapse"
            >{{comment.body}}</div>
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
      newComment: {}
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