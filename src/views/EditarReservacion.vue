<template>
  <Loading v-if="loading"/>
  <form class="reservation-form" v-else>
    <div class="wrapper">
      <div class="form-wrapped">
        <ReservationInput
          inputId="clientName"
          inputType="text"
          label="Nombre del Cliente"
          placeholder="Nombre"
          v-model="name"
        />
        <ReservationSelectInput
          inputId="roomQty"
          label="Cant. de habitaciones"
          dataListId="roomQtyList"
          :dataList="rooms"
          v-model="roomQty"
        />
        <ReservationInput
          inputId="dateOfArrival"
          inputType="date"
          label="Día de llegada"
          v-model="dateOfArrival"
          @change="checkDatesSelected"
        />
        <ReservationInput
          inputId="dateOfDeparture"
          inputType="date"
          label="Día de Salida"
          v-model="dateOfDeparture"
          @change="checkDatesSelected"
        />
        <div class="room-qty">No. de habitaciones</div>
        <div class="room-checkbox-wrapper">
          <div
            v-for="room in rooms"
            :key="room.key"
          >
            <ReservationCheckbox
              v-if="!room.disabled"
              :key="room.key"
              :inputId="`room-${room.key}`"
              :label="room.key"
              v-model="room.checked"
            />
          </div>
        </div>
        <ReservationSelectInput
          inputId="people"
          label="No. de Personas"
          dataListId="peopleList"
          :dataList="people"
          v-model="peopleQty"
        />
        <ReservationInput
          inputId="checkInTime"
          inputType="time"
          label="Check In"
          v-model="checkInTime"
        />
        <ReservationInput
          inputId="checkOutTime"
          inputType="time"
          label="Check Out"
          v-model="checkOutTime"
        />
      </div>
      <div class="form-wrapped">
        <ReservationCurrencyInput
          inputId="nightlyRate"
          label="Tarifa por Noche"
          v-model="nightlyRate"
        />
        <ReservationCurrencyInput
          inputId="totalPrice"
          label="Precio Total"
          v-model="totalPrice"
        />
        <ReservationCurrencyInput
          inputId="deposit"
          label="Deposito"
          v-model="deposit"
        />
        <div class="confirmation">
          <div class="title">No. de Confirmación</div>
          <div class="confirmation-number">{{ confirmationNumber }}</div>
        </div>
      </div>
    </div>
    <Button
      class="spacing"
      type="secondary"
      @click.prevent="submitReservation"
    >
      Confirmar
    </Button>
    <Button
      class="spacing"
      type="no-bg"
      @click.prevent="$router.go(-1)"
    >
      Cancelar
    </Button>
  </form>
</template>

<script>
import Button from '../components/Button.vue'
import ReservationInput from '../components/Reservations/Form/ReservationInput.vue'
import ReservationCheckbox from '../components/Reservations/Form/ReservationCheckbox.vue'
import ReservationSelectInput from '../components/Reservations/Form/ReservationSelectInput.vue'
import ReservationCurrencyInput from '../components/Reservations/Form/ReservationCurrencyInput.vue'
import { mapActions } from 'vuex'
import Loading from '../components/Loading.vue'

export default {
  name: 'ReservationForm',
  components: {
    Button,
    ReservationInput,
    ReservationCheckbox,
    ReservationSelectInput,
    ReservationCurrencyInput,
    Loading
  },
  data:(() => {
    return {
      reservation: {},
      people: [],
      rooms: [
        {
          key: 1,
          checked: false,
          disabled: false
        },
        {
          key: 2,
          checked: false,
          disabled: false
        },
        {
          key: 3,
          checked: false,
          disabled: false
        },
        {
          key: 4,
          checked: false,
          disabled: false
        },
        {
          key: 5,
          checked: false,
          disabled: false
        },
        {
          key: 6,
          checked: false,
          disabled: false
        },
        {
          key: 7,
          checked: false,
          disabled: false
        },
        {
          key: 8,
          checked: false,
          disabled: false
        },
        {
          key: 9,
          checked: false,
          disabled: false
        },
        {
          key: 10,
          checked: false,
          disabled: false
        },
        {
          key: 11,
          checked: false,
          disabled: false
        },
        {
          key: 12,
          checked: false,
          disabled: false
        },
        {
          key: 13,
          checked: false,
          disabled: false
        },
        {
          key: 14,
          checked: false,
          disabled: false
        },
        {
          key: 15,
          checked: false,
          disabled: false
        },
        {
          key: 16,
          checked: false,
          disabled: false
        },
        {
          key: 17,
          checked: false,
          disabled: false
        },
        {
          key: 18,
          checked: false,
          disabled: false
        },
        {
          key: 19,
          checked: false,
          disabled: false
        },
        {
          key: 20,
          checked: false,
          disabled: false
        },
        {
          key: 21,
          checked: false,
          disabled: false
        },
        {
          key: 22,
          checked: false,
          disabled: false
        },
        {
          key: 23,
          checked: false,
          disabled: false
        },
      ],
      name: '',
      roomQty: '',
      peopleQty: '',
      dateOfArrival: '',
      dateOfDeparture: '',
      checkInTime: '',
      checkOutTime: '',
      nightlyRate: '',
      totalPrice: '',
      deposit: '',
      confirmationNumber: '',
      loading: true
    };
  }),

  async mounted() {
    this.reservation = await this.fetchReservationById(this.$route.params.id)
    this.fillReservationData();
    this.checkDatesSelected();
    this.loading = false
  },

  methods: {
    ...mapActions(['fetchReservationById', 'updateReservation', 'getAvailableRoomsByDate']),
    submitReservation() {
      this.updateReservation({
        id: this.reservation._id,
        name: this.name,
        rooms: this.roomQty,
        dateOfArrival: this.dateOfArrival,
        dateOfDeparture: this.dateOfDeparture,
        occupiedRooms: this.rooms.filter(room => room.checked),
        peopleQty: this.peopleQty,
        checkInTime: this.checkInTime,
        checkOutTime: this.checkOutTime,
        nightlyRate: this.nightlyRate,
        totalPrice: this.totalPrice,
        deposit: this.deposit,
      })
      this.$router.push('/reservaciones')
    },

    async checkDatesSelected() {
      this.loading = true
      if (this.dateOfDeparture <= this.dateOfArrival) this.dateOfDeparture = ''
      if (this.dateOfArrival && this.dateOfDeparture && this.dateOfArrival !== '' && this.dateOfDeparture !== '') {
        const occupiedRooms = await this.getAvailableRoomsByDate({
          dateOfArrival: this.dateOfArrival,
          dateOfDeparture: this.dateOfDeparture,
        })
        if (occupiedRooms && occupiedRooms.length > 0) {
          this.rooms.forEach(room => {
            occupiedRooms.forEach(ocpRoom => {
              if (ocpRoom === room.key) {
                room.disabled = true
              }
            })
          })
        }
      }
      this.loading = false
    },

    fillReservationData() {
      this.name = this.reservation.name
      this.roomQty = this.reservation.rooms
      this.peopleQty = this.reservation.people
      this.dateOfArrival = this.reservation.dateOfArrival
      this.dateOfDeparture = this.reservation.dateOfDeparture
      this.checkInTime = this.reservation.checkIn
      this.checkOutTime = this.reservation.checkOut
      this.nightlyRate = this.reservation.nightlyRate
      this.totalPrice = this.reservation.totalPrice
      this.deposit = this.reservation.deposit
      this.confirmationNumber = this.reservation.confirmationNumber
    },
  },
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
    @include up_to('sm') {
      flex-direction: column;
      width: 100%;
    }
  }

  .form-wrapped {
    @include up_to('sm') {
      width: 100%;
    }
  }

  .form-wrapped:last-child {
    margin-left: 75px;
    @include up_to('sm') {
      margin-left: 0;
    }
  }

  .room-qty {
    font-size: 14px;
    color: $font_color;
  }

  .room-checkbox-wrapper {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }

  .room-flex {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .spacing {
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .title {
    font-size: 14px;
    color: $font_color;
    margin-bottom: 10px;
  }

  .confirmation-number {
    font-size: 20px;
    font-weight: bold;
    color: $font_color;
    margin-bottom: 10px;
  }

</style>