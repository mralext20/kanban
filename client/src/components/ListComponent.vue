<template>
  <div class="col-sm-12 col-md-3 pt-4">
    <div class="card text-dark">
      <div class="card-header">
        <div class="row">
          <div class="col-3">
            <div class="btn-group dropleft">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle caret-off py-0 px-1"
                data-toggle="dropdown"
              >
                <i class="fas fa-cog"></i>
              </button>
              <div class="dropdown-menu text-center">
                <!-- Dropdown menu links -->
                <h6 class="dropdown-header">List Options</h6>
                <li class="py-1" @click="editMode = !editMode">
                  <i class="fas fa-edit"></i> Edit List Title
                </li>
                <li id="delete-list" class="py-1" @click="deleteList">
                  <i class="fas fa-trash-alt"></i> Delete
                </li>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <ul v-if="editMode" class="list-group list-group-flush">
                <li>
                  <form class="form-inline" @submit.prevent="editListTitle">
                    <div class="col-6>">
                      <input
                        id="edit-list-form"
                        class="form-control form-control-sm ml-auto my-1"
                        v-model="listData.title"
                      />
                    </div>
                    <div class="col-3">
                      <button
                        type="submit"
                        class="btn btn-sm add-task-button btn-secondary ml-2 mr-auto my-2 py-1 px-2"
                      >
                        <i class="fas fa-plus-square"></i>
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
              <span v-else>{{listData.title}}</span>
            </div>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="bg-dark">
          <form @submit.prevent="addTask" class="form-inline">
            <input
              class="form-control form-control-sm ml-auto my-2"
              type="text"
              name="task"
              placeholder="Task..."
              v-model="newTask.body"
              required
            />
            <button
              type="submit"
              class="btn btn-sm add-task-button btn-secondary ml-2 mr-auto my-2 py-1 px-2"
            >
              <i class="fas fa-plus-square"></i>
            </button>
          </form>
        </li>
        <!-- <transition-group class="col-12" name="fade" mode="out-in"> -->
        <task
          v-for="task in listData.tasks"
          :key="task.id"
          :taskData="task"
          :left="isleft"
          class="list-group-item"
        />
        <!-- </transition-group> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Task from "../components/TaskComponent";
import NotificationService from "../NotificationService";
export default {
  name: "List",
  data() {
    return {
      editMode: false,
      newTask: {
        body: "",
        listId: this.listData.id
      }
    };
  },
  props: ["listData", "index"],
  methods: {
    async deleteList() {
      if (
        await NotificationService.confirmAction(
          "Are you sure you want to delete this list?"
        )
      ) {
        this.$store.dispatch("deleteList", this.listData.id);
        NotificationService.toast("Successfully deleted!");
      }
    },
    addTask() {
      this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask.body = "";
    },
    editListTitle() {
      this.$store.dispatch("editListTitle", this.listData);
      this.editMode = false;
    }
  },
  components: {
    Task
  },
  computed: {
    isleft() {
      return this.index % 4 == 0 || this.index % 4 == 1;
    }
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

li {
  list-style-type: none;
}

.add-task-button:hover {
  background-color: rgb(0, 110, 0);
}

#edit-list-form {
  width: 6rem;
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
  transform: translateX(-50px) rotate(90deg) scale(0) !important;
  transition: 0.2s ease all;
}
.dropdown-menu.show {
  display: block;
  visibility: visible;
  opacity: 1;
  transform: translate(50px, 50px) !important;
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

.btn {
  width: auto !important;
  padding: 0.1rem;
}

span {
  margin: auto !important;
}
</style>