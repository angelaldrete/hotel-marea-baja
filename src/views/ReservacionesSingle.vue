<template>
  <div class="reservation-list">
    <div class="date-heading">
      <div class="date">
        {{new Date(offsetedDate).toLocaleDateString('es-ES', {
          month: 'long',
        })}}
        {{ new Date(offsetedDate).getFullYear() }}
        -
        {{new Date(offsetedDate).toLocaleString('es-ES', {
          weekday: 'long',
          day: 'numeric'
        }) }}
      </div>
      <AddButton
        v-if="occupiedRoomsCount > 0 && occupiedRoomsCount < 23"
        @click.prevent="$router.push('/crear-reservacion')"
      >
        Crear reservación
      </AddButton>
    </div>

    <Loading v-if="loading"/>
    <template v-else>
      <div class="occupied-rooms-available">
        <div class="occupied-rooms">
          Habitaciones ocupadas: <span>{{ occupiedRooms.length }}</span>
        </div>
        <div class="available-rooms">
          Habitaciones disponibles: <span>{{ 23 - occupiedRooms.length }}</span>
        </div>
      </div>

      <Reservation
        v-for="reservation in filteredReservationsByDate"
        :key="reservation._id"
        :name="reservation.name"
        :rooms="reservation.rooms"
        :people="reservation.people"
        :occupiedRooms="reservation.occupiedRooms"
        :user="reservation.user"
        :checkInTime="reservation.checkIn"
        @click.prevent="$router.push(`/reservacion/${reservation._id}`)"
      />
    </template>


  </div>

</template>

<script>
import Reservation from '../components/Reservations/Reservation.vue'
import AddButton from '../components/AddButton.vue'
import { mapGetters } from 'vuex'
import Loading from '../components/Loading.vue'

export default {
  name: 'ReservacionesSingle',
  components: {
    Reservation,
    AddButton,
    Loading
  },

  computed: {
    ...mapGetters(['allReservations']),
    filteredReservationsByDate() {
      return this.allReservations.filter(reservation => reservation.dateOfArrival <= this.$route.params.date && reservation.dateOfDeparture >= this.$route.params.date)
    },

    occupiedRoomsCount() {
      return this.allReservations.filter(reservation => {
        if (reservation.dateOfArrival <= this.$route.params.date && reservation.dateOfDeparture >= this.$route.params.date)
          return reservation.occupiedRooms.length
      })
    },

    offsetedDate() {
      let date = new Date(this.$route.params.date)
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      return date
    }
  },

  data:() => ({
    occupiedRooms: [],
    loading: true
  }),

  mounted() {
    this.allReservations.forEach(reservation => {
      if (reservation.dateOfArrival <= this.$route.params.date && reservation.dateOfDeparture >= this.$route.params.date) {
        reservation.occupiedRooms.forEach(occupiedRoom => {
          this.occupiedRooms.push(occupiedRoom)
        })
      }
    })
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .occupied-rooms-available {
    font-size: 21px;
    margin-bottom: 40px;
    @include up_to('md') {
      font-size: 16px;
    }
    & div {
      margin-bottom: 5px;
      & span {
        font-weight: bold;
      }
    }
  }

  .date-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $calendar_font_color;
    text-transform: capitalize;
    @include up_to('md') {
      font-size: 20px;
    }
  }

</style>