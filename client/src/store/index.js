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
    lists: [],
    tasks: [],
    comments: []
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
      state.activeBoard.lists.push(list)
    },
    deleteList(state, id) {
      let lists = state.activeBoard.lists.filter(l => l.id != id)
      state.activeBoard.lists = lists
    },
    addTask(state, task) {
      let list = state.activeBoard.lists.find(l => l.id == task.listId)
      list.tasks.push(task)
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
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },

    async getBoardById({ commit, dispatch }, id) {
      try {
        let res = await api.get('boards/' + id)
        commit("setActiveBoard", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },

    setActiveBoard({ commit }, board) {
      commit("setActiveBoard", board)
    },
    //#endregion


    //#region -- LISTS --
    getLists({ commit }, boardId) {
      api.get(`boards/${boardId}`)
        .then(res => {
          commit('setLists', res.data.lists)
        })
    },

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
    }


    //#endregion
  }
})
