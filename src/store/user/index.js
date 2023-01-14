import axios from "axios";

const SET_USER_ID = "SET_USER_ID";
const SET_USERS = "SET_USERS";
const NEW_USER = "NEW_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";
const SET_LOGIN = "SET_LOGIN";
const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

const state = {
  loggedIn: false,
  accessToken: "",
  users: [],
  userId: "",
};

const getters = {
  allUsers: (state) => state.users,
  theUserId: (state) => state.userId,
  isLoggedIn: (state) => state.loggedIn,
  theAccessToken: (state) => state.accessToken,
};

const actions = {
  async registerUser({ commit }, { fullName, email, password }) {
    const response = await axios.post(
      `${process.env.VUE_APP_API_ENDPOINT}/api/users/register`,
      { fullName, email, password }
    );

    commit(NEW_USER, response.data);
  },

  async login({ commit }, { email, password }) {
    const body = {
      email,
      password,
    };

    const response = await axios.post(
      `${process.env.VUE_APP_API_ENDPOINT}/api/users/login`,
      body
    );

    if (!response.data.success) {
      alert(response.data.message);
    }

    commit(SET_USER_ID, response.data.userId);
    commit(SET_LOGIN, response.data.accessToken ? true : false);
    commit(SET_ACCESS_TOKEN, response.data.accessToken);
  },

  async logout({ commit }) {
    commit(SET_USER_ID, "");
    commit(SET_ACCESS_TOKEN, "");
    commit(SET_LOGIN, false);
  },

  async fetchUsers({ commit }) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/users`
    );

    commit(SET_USERS, res.data);
  },

  async fetchUserById(_, id) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/users/${id}`
    );
    return res.data;
  },

  async modifyEmail({ commit }, user) {
    const { id, email } = user;
    const res = await axios.put(
      `${process.env.VUE_APP_API_ENDPOINT}/api/users/email/${id}`,
      {
        email,
      }
    );

    commit(UPDATE_USER, user);
  },

  async modifyPassword({ commit }, user) {
    const { id, password } = user;
    const res = await axios.put(
      `${process.env.VUE_APP_API_ENDPOINT}/api/users/password/${id}`,
      {
        password,
      }
    );

    commit(UPDATE_USER, user);
  },

  async deleteUser({ commit }, id) {
    await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/api/users/${id}`);
    commit(REMOVE_USER, id);
  },
};

const mutations = {
  SET_USERS: (state, users) => (state.users = users),
  SET_USER_ID: (state, userId) => (state.userId = userId),
  NEW_USER: (state, user) => state.users.unshift(user),
  REMOVE_USER: (state, id) => state.users.filter((user) => user.id !== id),
  UPDATE_USER: (state, updatedUser) => {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  SET_LOGIN: (state, loggedIn) => (state.loggedIn = loggedIn),
  SET_ACCESS_TOKEN: (state, accessToken) => (state.accessToken = accessToken),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
