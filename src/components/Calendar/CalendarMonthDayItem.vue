<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--previous': day.date < new Date().toISOString().split('T')[0],
      'calendar-day--today': isToday,
      'some-reservations': someReservations,
      'full': full
    }"
    @click="someReservations ? $router.push(`/reservaciones/${day.date}`) : null"
  >
    <span>
      {{ label }}
    </span>

    <div class="weekday">
      {{ weekday }}
    </div>

    <div class="reservation" v-if="someReservations">
      <span class="reservation-count">
        {{ 23 - occupiedRooms }}
      </span>
      disponibles
    </div>
    <div class="reservation" v-else-if="full">
      <span class="full-count">
        {{ 23 - occupiedRooms }}
      </span>
      disponibles
    </div>
  </li>
</template>

<script>
import dayjs from "dayjs";
require('dayjs/locale/es')

export default {
  name: "CalendarMonthDayItem",

  props: {
    day: {
      type: Object,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    },
    reservations: Array
  },

  computed: {

    label() {
      return dayjs(this.day.date).format("DD");
    },

    weekday() {
      return dayjs(this.day.date).locale('es').format("dddd")
    },
  },

  data:() => ({
    occupiedRooms: [],
    someReservations: false,
    full: false
  }),

  created() {
    this.occupiedRooms = []
    this.reservations?.forEach(reservation => {
      if (this.day.date >= reservation.dateOfArrival && this.day.date <= reservation.dateOfDeparture) {
        this.occupiedRooms.push(reservation.occupiedRooms.length)
      }
    })
    this.occupiedRooms = this.occupiedRooms.reduce((arr, cur) => arr + cur, 0)
    if (this.occupiedRooms === 23) {
      this.full = true
    } else if (this.occupiedRooms > 0)
    this.someReservations = true
  },
};
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  outline: 1px solid #333;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-size: 14px;
    top: 8px;
    left: 8px;
    width: var(--day-label-size);
    height: var(--day-label-size);
    @include up_to('md') {
      font-weight: bold;
      font-size: 24px;
    }
  }
  @include up_to('md') {
    outline: none;
    border-top: 1px solid #333;
    width: 100%;
    min-height: 70px;
  }
}

.calendar-day--previous {
  background-color: rgba(grey, 0.15);
  @include up_to('md') {
    display: none;
  }
}

.calendar-day--not-current {
  background-color: rgba(grey, 0.25);
  color: var(--grey-300);
  cursor: default;
  @include up_to('md') {
    display: none;
  }
}

.calendar-day--today {
  padding-top: 4px;
  border: 2px solid $bg_secondary;
}

.reservation-count {
  font-weight: bold;
}

.some-reservations {
  background: $some_reservations;
  cursor: pointer;
  &:hover {
    background-color: var(--grey-200);
  }
  @include up_to('md') {
    font-weight: 400;
    font-size: 14px;
    color: $font_color;
    background: none;
    &::after {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translate(0, -50%);
      content: '';
      width: 20px;
      height: 20px;
      background: $some_reservations;
      border-radius: 50%;
    }
  }
}

.full {
  background: $full;

  @include up_to('md') {
    font-weight: 400;
    font-size: 14px;
    color: $font_color;
    background: none;
    &::after {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translate(0, -50%);
      content: '';
      width: 20px;
      height: 20px;
      background: $full;
      border-radius: 50%;
    }
  }
}

.reservation {
  font-size: 14px;
  position: absolute;
  content: '';
  bottom: 5px;
  left: 10px;
  @include up_to('md') {
    left: 2px;
  }
}

.reservation-responsive {
  display: none;
  position: absolute;
  content: '';
  font-weight: 400;
  font-size: 14px;
  bottom: 10px;
  color: $font_color;
  @include up_to('md') {
    display: block;
  }
}

.weekday {
  display: none;
  @include up_to('md') {
    position: absolute;
    display: block;
    text-transform: capitalize;
    left: 38px;
    top: 4px;
    font-size: 24px;
    font-weight: bold;
  }
}

</style>
