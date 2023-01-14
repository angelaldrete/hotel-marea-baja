<template>
  <div>
    <div class="title">
      Buscar Cliente
    </div>

    <template
      v-if="filteredReservationsBySearch.length > 0"
    >
      <ReservationEditable
        v-for="reservation in filteredReservationsBySearch"
        :key="reservation._id"
        :name="reservation.name"
        :rooms="reservation.rooms"
        :people="reservation.people"
        :occupiedRooms="reservation.occupiedRooms"
        :user="reservation.user"
        :checkInTime="reservation.checkIn"
        :id="reservation._id"
        :dateOfArrival="reservation.dateOfArrival"
      />
    </template>
    
    <div class="no-reservations" v-else>
      No se encontraron reservaciones con la informacion: {{$route.query.cliente}}
    </div>
  </div>
</template>

<script>
import ReservationEditable from '../components/Reservations/ReservationEditable.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BuscarCliente',
  components: {
    ReservationEditable
  },

  async mounted() {
    await this.fetchReservations()
  },

  methods: {
    ...mapActions(['fetchReservations'])
  },

  computed: {
    ...mapGetters(['allReservations']),
    filteredReservationsBySearch() {
      return this.allReservations.filter(reservation => {
        if (this.$route.query && (this.$route.query.cliente.match(/[a-zA-z]/g))) {
          if (reservation.name.toUpperCase() === this.$route.query.cliente.toUpperCase() || reservation.name.includes(this.$route.query.cliente)) {
            return reservation
          }
        }
        if (this.$route.query && (this.$route.query.cliente.match(/[0-9]/g))) {
          if (reservation.confirmationNumber.toString() === this.$route.query.cliente) {
            return reservation
          }
        }
      })
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
  }

</style>