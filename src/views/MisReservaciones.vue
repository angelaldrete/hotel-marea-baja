<template>
  <div>
    <div class="title">
      Mis Reservaciones
    </div>

    <Loading v-if="loading"/>
    <ReservationEditable
      v-else
      v-for="reservation in filteredReservationsByUser"
      :key="reservation._id"
      :checkInTime="reservation.checkIn"
      :name="reservation.name"
      :occupiedRooms="reservation.occupiedRooms"
      :people="reservation.people"
      :rooms="reservation.rooms"
      :user="reservation.user"
      :id="reservation._id"
      :dateOfArrival="reservation.dateOfArrival"
    />
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import ReservationEditable from '../components/Reservations/ReservationEditable.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MisReservaciones',
  components: {
    ReservationEditable,
    Loading
  },

  data: () => ({
    loading: true
  }),

  async mounted() {
    await this.fetchReservations()
    this.loading = false
  },

  methods: {
    ...mapActions(['fetchReservations']),
  },

  computed: {
    ...mapGetters(['theUserId', 'allReservations']),
    filteredReservationsByUser() {
      return this.allReservations.filter(reservation => reservation.user.id === this.theUserId)
    }
  },
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: $calendar_font_color;
    @include up_to('md') {
      font-size: 20px;
    }
  }

  .my-reservation-item {
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    }
  }

</style>