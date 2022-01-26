import axios from 'axios'

const SET_USER = 'SET_USER'
const SET_LOGIN = 'SET_LOGIN'
const SET_USERS = 'SET_USERS'
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

const state = {
  loggedIn: false,
  accessToken: '',
  users: []
}

const getters = {
  allUsers:(state) => state.users,
  theUser:(state) => state.user,
  isLoggedIn:(state) => state.loggedIn,
  theAccessToken:(state) => state.accessToken
}

const actions = {

  async registerUser(_, { fullName, email, password }) {
    const response = await axios.post('http://localhost:3000/api/users/register', { fullName, email, password })
    return response.data
  },

  async login({ commit }, { email, password }) {

    const body = {
      email,
      password
    }

    const response = await axios.post('http://localhost:3000/api/users/login', body)

    console.log(response)

    commit(SET_LOGIN, response.data.accessToken ? true : false)
    commit(SET_ACCESS_TOKEN, response.data.accessToken)

  },

  async logout({ commit }) {
    commit(SET_USER, {})
    commit(SET_ACCESS_TOKEN, '')
    commit(SET_LOGIN, false)
  },

  async getUsers({ commit }) {
    const res = await axios.get('http://localhost:3000/api/users')

    commit(SET_USERS, res.data)
  },

  async getUser({ commit }) {
    const res = await axios.get(`http://localhost:3000/api/users/me`)

    commit(SET_USER, res.data)
  },

  async modifyUsername({ commit }, {id, username}) {
    const res = await axios.put(`http://localhost:3000/api/users/username/${id}`, {
      username
    })

    commit(SET_USER, res.data)
  },

  modifyPassword(_, {id, password}) {
    console.log(id)
    return axios.put(`http://localhost:3000/api/users/password/${id}`, {
      password
    })
  },

  deleteUser(_, {id}) {
    return axios.delete(`http://localhost:3000/api/users/${id}`)
  }
}


const mutations = {
  SET_USER:(state, user) => state.user = user,
  SET_USERS:(state, users) => state.users = users,
  SET_LOGIN:(state, loggedIn) => state.loggedIn = loggedIn,
  SET_ACCESS_TOKEN:(state, accessToken) => state.accessToken = accessToken
}

export default {
  state,
  getters,
  actions,
  mutations
}