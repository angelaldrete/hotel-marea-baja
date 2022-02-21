import axios from 'axios'

const SET_RESERVATIONS = 'SET_RESERVATIONS'
const SET_RESERVATION = 'SET_RESERVATION'
const SET_OCCUPIED_ROOMS = 'SET_OCCUPIED_ROOMS'

const state = {
  reservation: {},
  reservations: []
}

const getters = {
  allReservations: (state) => state.reservations,
  theReservation: (state) => state.reservation
}

const actions = {
  async getAllReservations({ commit }) {
    const res = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/api/reservations`)
    if (res.status === 200) {
      commit(SET_RESERVATIONS, res.data)
    }
  },

  async getAllReservationsByDate({ commit }, date) {
    const res = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/api/reservations`, {
      params: {
        date
      }
    })
    if (res.status === 200) {
      commit(SET_RESERVATIONS, res.data)
    }
  },

  async getReservationById({ commit }, id) {
    const res = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/api/reservations/${id}`)

    if (res.status === 200) {
      commit(SET_RESERVATION, res.data)
    }
  },

  async getConfirmationNumber() {
    const res = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/api/confirmation`)
    return res.data.confirmationNumber
  },

  async createReservation({ commit }, reservation) {
    const res = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/api/reservations`, reservation)

    commit(SET_RESERVATIONS, res.data)
  },

  async getAvailableRoomsByDate({ commit }, { dateOfArrival, dateOfDeparture }) {
    const res = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/api/available_rooms/${dateOfArrival}/${dateOfDeparture}`)

    console.log(res)

    if (res.status === 200) {
      commit(SET_OCCUPIED_ROOMS, res.data)
    }
  },

  async updateReservation(_, reservation) {
    const res = await axios.put(`${process.env.VUE_APP_API_ENDPOINT}/api/reservations/${reservation.id}`, reservation)
    return res.data
  }
}

const mutations = {
  SET_RESERVATIONS(state, reservations) {
    state.reservations = reservations
  },

  SET_RESERVATION(state, reservation) {
    state.reservation = reservation
  },

  SET_OCCUPIED_ROOMS(state, occupiedRooms) {
    state.reservation.occupiedRooms = occupiedRooms
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}