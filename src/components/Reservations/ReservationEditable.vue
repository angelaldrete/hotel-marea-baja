<template>
  <div
    class="reservation"
    >
    <div class="information">
      <h2 class="name">
        {{ name }}
      </h2>
      <div class="rooms">
        {{ rooms }} habitaciones
      </div>
      <div class="people">
        {{ people }} personas
      </div>
      <div class="occupied-rooms">
        Habitaciones ocupadas
        <span v-for="(room, index) in occupiedRooms" class="occupied-room" :key="room">
          {{ (occupiedRooms.length - 1) === index ? room : room + ','}}
        </span>
      </div>
    </div>
    <div class="check-in">
      <h2 class="check-in-date">
        {{ new Date(dateOfArrival).getFullYear() }} / <span class="capitalize">{{ new Date(offsetedDate).toLocaleDateString('es-ES', { month: 'long'} ) }}</span> / {{ new Date(offsetedDate).getDate() }}
      </h2>
      <h2 class="check-in-time">
        Check in: {{ checkInTime }}
      </h2>
      <div class="user">
        Reservación hecha por {{ user.fullName }}
      </div>
    </div>
    <div class="edit">
      <Button
        type="secondary"
        @click="$router.push(`/editar-reservacion/${id}`,)"
      >
        Editar
      </Button>
    </div>
    <div class="delete">
      <Button
        type="delete"
        @click="deleteReservation"
      >
        Eliminar
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '../Button';
import { mapActions } from 'vuex'

export default {
  name: 'ReservationEditable',
  props: {
    id: String,
    name: {
      type: String,
    },
    rooms: {
      type: Number,
      default: 10
    },
    people: {
      type: Number,
      default: 10
    },
    occupiedRooms: {
      type: Array,
      default: () => [1, 2, 3]
    },
    dateOfArrival: {
      type: String,
    },
    checkInTime: {
      type: String,
      default: () => new Date().toLocaleTimeString('es-ES', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Mexico_City'
      })
    },
    user: {
      type: Object,
    }
  },

  data:() => ({
    toggleDeletePopup: false
  }),

  components: {
    Button
  },

  computed: {
    offsetedDate() {
      let date = new Date(this.dateOfArrival)
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      return date
    }
  },

  methods: {
    ...mapActions({ removeReservation: 'deleteReservation' }),

    async deleteReservation() {
      const answer = prompt(`Estas seguro que quieres borrar la reservacion ${this.name} (Ss/Nn)`)
      if (answer && answer.match(/[Ss][Ii]?/g)) {
        await this.removeReservation(this.id)
        alert(`La reservacion ${this.name} fue borrada exitosamente`)
        this.$router.push('/')
      }
    }
  }
}

</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

  .reservation {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    color: $font_color;
    width: 800px;
    @include up_to('sm') {
      width: 100%;
      flex-direction: column;
      margin-bottom: 20px;
    }

  }

  .reservation:nth-child(odd) {
    background: $background;
  }

  .name, .check-in-time, .check-in-date {
    font-size: 20px;
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .check-in-time {
    margin-bottom: 0;
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .user {
    font-size: 14px;
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .information {
    font-size: 16px;
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .occupied-room {
    font-weight: bold;
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .capitalize {
    text-transform: capitalize;
  }

  .edit {
    @include up_to('sm') {
      margin-bottom: 20px;
    }
  }

  .popup {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    content: '';
    text-align: center;
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    width: 250px;
    border-radius: 5px;
    z-index: 2;
    right: -300px;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;

    button {
      margin-bottom: 10px;
    }
  }

</style>