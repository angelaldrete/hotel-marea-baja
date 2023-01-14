<template>
  <form class="reservation-form">
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
        <div class="room-qty" v-if="dateOfDeparture.length > 0">No. de habitaciones</div>
        <div class="room-checkbox-wrapper" v-if="dateOfDeparture.length > 0">
          <!-- <div class="room-flex"> -->
            <Loading v-if="loading"/>
            <div v-else
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
          <!-- </div> -->
          <!-- <div class="room-flex">
            <div
              v-for="room in filteredRooms.slice(-Math.ceil(filteredRooms.length / 2))"
              :key="room.key"
            >
              <ReservationCheckbox
                :key="room.key"
                :inputId="`room-${room.key}`"
                :label="room.key"
                :disabled="room.disabled"
                v-model="room.checked"
              />
            </div>
          </div> -->
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
        <div class="confirmation-number">
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
import Button from '../../Button.vue'
import ReservationInput from './ReservationInput.vue'
import ReservationCheckbox from './ReservationCheckbox.vue'
import ReservationSelectInput from './ReservationSelectInput.vue'
import ReservationCurrencyInput from './ReservationCurrencyInput.vue'
import { mapActions, mapGetters } from 'vuex'
import Loading from '../../Loading.vue'

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
      people: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
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
      loading: false
    };
  }),

  async created() {
    this.confirmationNumber = await this.getConfirmationNumber()
  },

  computed: {
    ...mapGetters(['allOccupiedRooms']),
  },

  methods: {
    ...mapActions(['createReservation', 'getConfirmationNumber', 'getAvailableRoomsByDate']),
    submitReservation() {
      const occupiedRooms = this.rooms.filter(room => room.checked).map(filteredRoom => filteredRoom.key)
      this.createReservation({
        name: this.name,
        rooms: this.roomQty,
        dateOfArrival: this.dateOfArrival,
        dateOfDeparture: this.dateOfDeparture,
        occupiedRooms: occupiedRooms,
        peopleQty: this.peopleQty,
        checkInTime: this.checkInTime,
        checkOutTime: this.checkOutTime,
        nightlyRate: this.nightlyRate,
        totalPrice: this.totalPrice,
        deposit: this.deposit,
        confirmationNumber: this.confirmationNumber,
      })
      this.$router.push('/')
    },

    async checkDatesSelected() {
      this.loading = true
      this.rooms = [
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
          ]
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
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../../assets/sass/_main.scss';
  @import '../../../assets/sass/_mixin.scss';
  @import '../../../assets/sass/_variables.scss';

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
    font-weight: bold;
    color: $font_color;
    font-size: 20px;
  }

</style>