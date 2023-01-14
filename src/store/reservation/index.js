import axios from "axios";

const SET_RESERVATIONS = "SET_RESERVATIONS";
const SET_RESERVATIONS_BY_DATE = "SER_RESERVATIONS_BY_DATE";
const NEW_RESERVATION = "NEW_RESERVATION";
const UPDATE_RESERVATION = "UPDATE_RESERVATION";
const REMOVE_RESERVATION = "REMOVE_RESERVATION";

const state = {
  reservationsByDate: [],
  reservations: [],
};

const getters = {
  allReservations: (state) => state.reservations,
  dateReservations: (state) => state.dateReservations,
};

const actions = {
  async fetchReservations({ commit }) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations`
    );

    commit(SET_RESERVATIONS, res.data);
  },

  async fetchReservationsByMonth(_, { month, year }) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations/${month}/${year}`
    );
    return res.data;
  },

  async fetchReservationsByDate({ commit }, date) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations`,
      {
        params: {
          date,
        },
      }
    );
    commit(SET_RESERVATIONS_BY_DATE, res.data);
  },

  async fetchReservationById(_, id) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations/${id}`
    );

    return res.data;
  },

  async getConfirmationNumber() {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/confirmation`
    );
    return res.data.confirmationNumber;
  },

  async createReservation({ commit }, reservation) {
    const res = await axios.post(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations`,
      reservation
    );

    commit(NEW_RESERVATION, res.data);
  },

  async getAvailableRoomsByDate(_, { dateOfArrival, dateOfDeparture }) {
    const res = await axios.get(
      `${process.env.VUE_APP_API_ENDPOINT}/api/available_rooms/${dateOfArrival}/${dateOfDeparture}`
    );

    return res.data;
  },

  async updateReservation({ commit }, reservation) {
    const res = await axios.put(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations/${reservation.id}`,
      reservation
    );
    commit(UPDATE_RESERVATION, reservation);
  },

  async deleteReservation({ commit }, id) {
    const res = await axios.delete(
      `${process.env.VUE_APP_API_ENDPOINT}/api/reservations/${id}`
    );
    commit(REMOVE_RESERVATION, id);
  },
};

const mutations = {
  SET_RESERVATIONS: (state, reservations) =>
    (state.reservations = reservations),
  SET_RESERVATIONS_BY_DATE: (state, reservationsByDate) =>
    (state.reservationsByDate = reservationsByDate),
  NEW_RESERVATION: (state, reservation) =>
    state.reservations.unshift(reservation),
  UPDATE_RESERVATION: (state, updatedReservation) => {
    const index = state.reservations.findIndex(
      (reservation) => reservation._id === updatedReservation._id
    );
    if (index !== -1) {
      state.reservations.splice(index, 1, updatedReservation);
    }
  },
  REMOVE_RESERVATION: (state, id) =>
    state.reservations.filter((reservation) => reservation._id !== id),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
