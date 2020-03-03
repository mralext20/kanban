<template>
  <div class="col-sm-12 col-md-3 pt-4">
    <div class="card text-dark">
      <div class="card-header">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <span>{{listData.title}}</span>
          </div>
          <div class="col-3">
            <button @click="deleteList" class="btn btn-sm btn-danger px-1 mr-3">Delete</button>
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="bg-dark">
          <form @submit.prevent="addTask" class="form-inline">
            <button type="submit" class="btn btn-sm btn-secondary mx-auto mr-3 my-2">Add Task</button>
            <input
              class="form-control form-control-sm mx-auto my-2"
              type="text"
              name="task"
              placeholder="Task..."
              v-model="newTask.body"
              required
            />
          </form>
        </li>
        <task
          v-for="task in listData.tasks"
          :key="task.id"
          :taskData="task"
          class="list-group-item"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Task from "../components/TaskComponent";
export default {
  name: "List",
  data() {
    return {
      newTask: {
        body: "",
        listId: this.listData.id
      }
    };
  },
  props: ["listData"],
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData.id);
    },
    addTask() {
      this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask.body = "";
    }
  },
  components: {
    Task
  }
};
</script>

<style scoped>
.card {
  width: auto !important;
}

.btn {
  width: auto !important;
  padding: 0.1rem;
}

span {
  margin-left: auto !important;
}
</style>