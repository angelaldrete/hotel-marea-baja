<template>
  <div class="reservation-single">
    <div class="reservation-wrapper">
      <div class="name reservation-item">
        {{ theReservation.name }}
      </div>
      <div class="reservation-item">
        <div
          class="label"
        >
          Cant. de habitaciones
        </div>
        <div
          class="value"
        >
          {{ theReservation.rooms }}
        </div>
      </div>
      <div class="label">
        No. de habitaciones
      </div>
      <div class="reservation-item">
        <span
          v-for="(room, index) in theReservation.occupiedRooms"
          :key="index"
          class="room-num"
        >
          {{ room === theReservation.occupiedRooms[theReservation.occupiedRooms.length - 1] ? room : `${room},` }}
        </span>
      </div>
      <div class="reservation-item">
        <div class="label">
          No. de Personas
        </div>
        <div class="value">
          {{ theReservation.people }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">Día de llegada</div>
        <div class="value">
          {{ new Date(offsetedArrivalDate).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">Día de salida</div>
        <div class="value">
          {{ new Date(offsetedDepartureDate).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">Check In</div>
        <div class="value">
          {{ theReservation.checkIn }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">Check Out</div>
        <div class="value">
          {{ theReservation.checkOut }}
        </div>
      </div>
    </div>
    <div class="reservation-wrapper">
      <div class="reservation-item">
        <div class="label">
          Tarifa por noche
        </div>
        <div class="value">
          ${{ theReservation.nightlyRate }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">
          Precio Total
        </div>
        <div class="value">
          ${{ theReservation.totalPrice }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">
          Deposito
        </div>
        <div class="value">
          ${{ theReservation.deposit }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">
          No. de Confirmación
        </div>
        <div class="value">
          {{ theReservation.confirmationNumber }}
        </div>
      </div>
      <div class="reservation-item">
        <div class="label">Reservación hecha por <strong>{{ theReservation.user.fullName }}</strong></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Reservacion',

  computed: {
    ...mapGetters(['theReservation']),

    offsetedArrivalDate() {
      let date = new Date(this.theReservation.dateOfArrival)
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      return date
    },

    offsetedDepartureDate() {
      let date = new Date(this.theReservation.dateOfDeparture)
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      return date
    }
  },

  methods: {
    ...mapActions(['getReservationById']),
  },

  async mounted() {
    await this.getReservationById(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .reservation-single {
    display: flex;
    color: $font_color;
    @include up_to('sm') {
      flex-direction: column;
    }
  }

  .label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .name,
  .value,
  .room-num {
    font-weight: bold;
    font-size: 21px;
  }

  .reservation-item {
    margin-bottom: 20px;
  }

  .reservation-wrapper {
    flex: 0.3;
  }

</style>