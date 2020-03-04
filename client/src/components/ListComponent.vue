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
            <div class="btn-group dropright">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle caret-off px-1"
                data-toggle="dropdown"
              >
                <i class="fas fa-cog"></i>
              </button>
              <div class="dropdown-menu text-center">
                <!-- Dropdown menu links -->
                <li class="py-1">
                  <i class="fas fa-edit"></i> Edit List Title
                </li>
                <li id="delete-list" class="py-1" @click="deleteList">
                  <i class="fas fa-trash-alt"></i> Delete
                </li>
              </div>
            </div>
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
        <transition name="fade">
          <task
            v-for="task in listData.tasks"
            :key="task.id"
            :taskData="task"
            class="list-group-item"
          />
        </transition>
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
li:hover {
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

.caret-off::before {
  display: none;
}
.caret-off::after {
  display: none;
}

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
  transform: translateX(50px) !important;
  transition: 0.2s ease all;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

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