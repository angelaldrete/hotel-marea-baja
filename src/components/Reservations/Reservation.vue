<template>
  <div
    @click="$emit('click', $event)"
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
        <span v-for="room in occupiedRooms" class="occupied-room" :key="room">
          <template v-if="occupiedRooms.length > 0 && occupiedRooms[occupiedRooms.length - 1] !== room">
            {{ `${room},` }}
          </template>
          <template v-else>
            {{ room }}
          </template>
        </span>
      </div>
    </div>
    <div class="check-in">
      <h2 class="check-in-time">
        Check in: {{ checkInTime }}
      </h2>
      <div class="user">
        Reservación hecha por {{ user.fullName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Reservation',
  props: {
    name: {
      type: String,
      default: 'Berenice Meza'
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
      default: () => ({
        fullName: 'Berenice Meza'
      })
    }
  },
}

</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

  .reservation {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 30px;
    color: $font_color;
    width: 800px;
    margin-bottom: 10px;
    @include up_to('md') {
      width: 100%;
      flex-direction: column;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .reservation:nth-child(odd) {
    background: $background;
  }

  .name, .check-in-time {
    font-size: 20px;
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
    flex: 1;
    font-size: 16px;
    @include up_to('md') {
      margin-bottom: 10px;
    }
  }

  .check-in {
    flex: 2;
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

</style>