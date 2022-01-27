<template>
  <form class="reservation-form">
    <div class="wrapper">
      <div class="form-wrapped">
        <ReservationInput
          inputId="clientName"
          inputType="text"
          label="Nombre del Cliente"
          v-model="name"
        />
        <ReservationSelectInput
          inputId="roomQty"
          label="Cant. de habitaciones"
          dataListId="roomQtyList"
          :dataList="rooms"
          v-model="roomQty"
        />
        <div class="room-qty">No. de habitaciones</div>
        <div class="room-checkbox-wrapper">
          <div class="room-flex">
            <div
              v-for="room in filteredRooms.slice(0, Math.ceil(filteredRooms.length / 2))"
              :key="room.key"
            >
              <ReservationCheckbox
                :key="room.key"
                :inputId="`room-${room.key}`"
                :label="room.key"
                v-model="room.checked"
              />
            </div>
          </div>
          <div class="room-flex">
            <div
              v-for="room in filteredRooms.slice(-Math.ceil(filteredRooms.length / 2))"
              :key="room.key"
            >
              <ReservationCheckbox
                :key="room.key"
                :inputId="`room-${room.key}`"
                :label="room.key"
                v-model="room.checked"
              />
            </div>
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
          inputId="dateOfArrival"
          inputType="date"
          label="Día de llegada"
          v-model="dateOfArrival"
        />
        <ReservationInput
          inputId="dateOfDeparture"
          inputType="date"
          label="Día de Salida"
          v-model="dateOfDeparture"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReservationForm',
  components: {
    Button,
    ReservationInput,
    ReservationCheckbox,
    ReservationSelectInput,
    ReservationCurrencyInput,
  },
  data:(() => {
    return {
      people: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      rooms: [
        {
          key: 1,
          checked: false
        },
        {
          key: 2,
          checked: false
        },
        {
          key: 3,
          checked: false
        },
        {
          key: 4,
          checked: false
        },
        {
          key: 5,
          checked: false
        },
        {
          key: 6,
          checked: false
        },
        {
          key: 7,
          checked: false
        },
        {
          key: 8,
          checked: false
        },
        {
          key: 9,
          checked: false
        },
        {
          key: 10,
          checked: false
        },
        {
          key: 11,
          checked: false
        },
        {
          key: 12,
          checked: false
        },
        {
          key: 13,
          checked: false
        },
        {
          key: 14,
          checked: false
        },
        {
          key: 15,
          checked: false
        },
        {
          key: 16,
          checked: false
        },
        {
          key: 17,
          checked: false
        },
        {
          key: 18,
          checked: false
        },
        {
          key: 19,
          checked: false
        },
        {
          key: 20,
          checked: false
        },
        {
          key: 21,
          checked: false
        },
        {
          key: 22,
          checked: false
        },
        {
          key: 23,
          checked: false
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
      confirmationNumber: ''
    };
  }),

  computed: {
    filteredRooms: {
      get() {
        return this.rooms.filter(room => room.key != 1);
      },
      set(value) {
        this.rooms = value;
      }
    },
    ...mapGetters(['allReservations']),
    ...mapGetters(['theReservation'])
  },

  methods: {
    ...mapActions(['getReservationById']),
    submitReservation() {
      this.updateReservation({
        name: this.name,
        roomQty: this.roomQty,
        peopleQty: this.peopleQty,
        dateOfArrival: this.dateOfArrival,
        dateOfDeparture: this.dateOfDeparture,
        checkInTime: this.checkInTime,
        checkOutTime: this.checkOutTime,
        nightlyRate: this.nightlyRate,
        totalPrice: this.totalPrice,
        deposit: this.deposit,
        rooms: this.roomQty,
        occupiedRooms: this.rooms.filter(room => room.checked).map(room => room.key),
      })
      this.$router.push('/')
    }
  },

  async mounted() {
    await this.getReservationById(this.$route.params.id)
  },

  created() {
    this.name = this.theReservation.name
    this.roomQty = this.theReservation.rooms
    this.filteredRooms.forEach(room => {
      this.theReservation.occupiedRooms.forEach(occupiedRoom => {
        if (room.key == occupiedRoom) {
          room.checked = true
        }
      })
    })
    this.peopleQty = this.theReservation.people
    this.dateOfArrival = this.theReservation.dateOfArrival
    this.dateOfDeparture = this.theReservation.dateOfDeparture
    this.checkInTime = this.theReservation.checkIn
    this.checkOutTime = this.theReservation.checkOut
    this.nightlyRate = this.theReservation.nightlyRate
    this.totalPrice = this.theReservation.totalPrice
    this.deposit = this.theReservation.deposit
    this.confirmationNumber = this.theReservation.confirmationNumber
  }
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