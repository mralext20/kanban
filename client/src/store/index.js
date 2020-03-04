import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},

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
    addList(state, list) {
      Vue.set(state.activeBoard.lists, list.id, list)
    },
    deleteList(state, id) {
      Vue.delete(state.activeBoard.lists, id)
    },
    addTask(state, task) {
      let list = state.activeBoard.lists[task.listId]
      list.tasks.push(task)
    },
    moveTask(state, { task, target }) {
      let oldList = state.activeBoard.lists[task.listId];
      oldList = oldList.tasks.filter(t => t.id != task.id)
      state.activeBoard.lists[task.listId].tasks = oldList;

      task.listId = target // change the task's listId to its new list id
      state.activeBoard.lists[target].tasks.push(task)

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
        let lists = [...board.lists]
        board.lists = {}
        lists.forEach(list => board.lists[list.id] = list)
        return board
      });
      commit('setBoards', data)
    },

    async getBoardById({ commit, dispatch }, id) {
      try {
        let res = await api.get('boards/' + id)
        let lists = [...res.data.lists]
        res.data.lists = {}
        lists.forEach(list => res.data.lists[list.id] = list)
        commit("setActiveBoard", res.data)

      } catch (error) {
        console.error(error)
      }
    },

    async addBoard({ commit, dispatch }, boardData) {
      let res = await api.post('boards', boardData)
      dispatch('getBoards')

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

    //#endregion 

    //#region -- TASKS --

    async addTask({ commit, }, taskData) {
      let res = await api.post('tasks', taskData)
      commit("addTask", res.data)
    },

    async moveTasks({ commit }, { task, target }) {
      let res = await api.put(`tasks/${task.id}`, { listId: target })
      commit("moveTask", { task, target })
    }


    //#endregion
  }
})
