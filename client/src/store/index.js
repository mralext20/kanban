import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'
import NotificationService from "../NotificationService";

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'


let api = Axios.create({
  baseURL: base + "api/",
  timeout: 30000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },

    deleteBoard(state, id) {
      state.boards = state.boards.filter(b => b.id != id)
    },

    addList(state, list) {
      Vue.set(state.activeBoard.lists, list.id, list)
    },
    deleteList(state, id) {
      Vue.delete(state.activeBoard.lists, id)
    },
    addTask(state, task) {
      Vue.set(state.activeBoard.lists[task.listId].tasks, task.id, task)
    },
    moveTask(state, { task, target }) {
      Vue.delete(state.activeBoard.lists[task.listId].tasks, task.id)
      task.listId = target // change the task's listId to its new list id
      Vue.set(state.activeBoard.lists[task.listId].tasks, task.id, task)
    },
    deleteComment(state, { comment, task }) {
      let comments = state.activeBoard.lists[task.listId].tasks[task.id].comments.filter(c => c.id != comment.id)
      state.activeBoard.lists[task.listId].tasks[task.id].comments = comments
    },
    addComment(state, { newComment, listId, taskId }) {
      state.activeBoard.lists[listId].tasks[taskId].comments.push(newComment)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      let res = await api.get('boards')
      let data = res.data.map(board => {
        let lists = board.lists
        board.lists = {}
        lists.forEach(list => {
          let tasks = list.tasks
          list.tasks = {}
          tasks.forEach(task => {
            list.tasks[task.id] = task
          });
          board.lists[list.id] = list
        })
        return board
      });
      commit('setBoards', data)
    },

    async getBoardById({ commit, dispatch }, id) {
      try {
        let res = await api.get('boards/' + id)
        let lists = res.data.lists
        res.data.lists = {}
        lists.forEach(list => {
          let tasks = list.tasks
          list.tasks = {}
          tasks.forEach(task => {
            list.tasks[task.id] = task
          });
          res.data.lists[list.id] = list
        })
        commit("setActiveBoard", res.data)

      } catch (error) {
        console.error(error)
      }
    },

    async addBoard({ commit, dispatch }, boardData) {
      let res = await api.post('boards', boardData)
      dispatch('getBoards')

    },

    async deleteBoard({ commit }, board) {
      let res = await api.delete(`boards/${board.id}`, board)
      commit('deleteBoard')
    },

    async editBoardTitle({ commit }, boardData) {
      try {
        let res = await api.put(`boards/${boardData.id}`, { title: boardData.title })
        await NotificationService.toast("Board Title Changed Successfully")
      } catch (error) {
        await NotificationService.toast("Failed to Update Board Title", 3000, "error")
      }
    },

    async editBoardDescription({ commit }, boardData) {
      try {
        let res = await api.put(`boards/${boardData.id}`, { description: boardData.description })
        await NotificationService.toast("List Description Changed Successfully")
      } catch (error) {
        await NotificationService.toast("Failed to Update Board Description", 3000, "error")

      }
    },
    setActiveBoard({ commit }, board) {
      commit("setActiveBoard", board)
    },
    //#endregion


    //#region -- LISTS --
    async addList({ commit }, listData) {
      let res = await api.post('lists', listData)
      commit("addList", res.data)
    },

    async deleteList({ commit }, listData) {
      let res = await api.delete(`lists/${listData}`)
      commit("deleteList", listData)
    },

    async editListTitle({ commit }, listData) {
      try {
        let res = await api.put(`lists/${listData.id}`, { title: listData.title })
        await NotificationService.toast("List Title Changed Successfully")
      } catch (error) {
        await NotificationService.toast("Failed to Update List Title", 3500, "error")

      }
    },

    //#endregion 

    //#region -- TASKS --

    async addTask({ commit, }, taskData) {
      let res = await api.post('tasks', taskData)
      commit("addTask", res.data)
    },

    async moveTasks({ commit }, { task, target }) {
      let res = await api.put(`tasks/${task.id}`, { listId: target })
      commit("moveTask", { task, target })
    },


    //#endregion
    //#region -- COMMENTS --
    async deleteComment({ commit }, { comment, task }) {
      await api.delete(`comments/${comment.id}`)
      commit("deleteComment", { comment, task })
    },
    async addComment({ commit }, { newComment, listId }) {
      let res = await api.post("comments", newComment)
      commit("addComment", { newComment: res.data, listId, taskId: newComment.taskId })
    }

    ////#endregion
  }
})
