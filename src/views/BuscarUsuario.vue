<template>
  <div>
    <div class="title">
      Buscar Cliente
    </div>

    <Reservation
      v-for="reservation in filteredReservationsBySearch"
      :key="reservation.id"
      :name="reservation.name"
      :rooms="reservation.rooms"
      :people="reservation.people"
      :occupiedRooms="reservation.occupiedRooms"
      :user="reservation.user"
      :checkInTime="reservation.checkIn"
      @click.prevent="$router.push(`/reservacion/${reservation._id}`)"
    />
  </div>
</template>

<script>
import Reservation from '../components/Reservations/Reservation.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'BuscarUsuario',
  components: {
    Reservation
  },

  computed: {
    ...mapGetters(['allReservations']),
    filteredReservationsBySearch() {
      return this.allReservations.filter(reservation => reservation.name === this.$route.params.name)
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