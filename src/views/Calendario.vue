<template>
  <div>
    <div class="calendar">
      <CalendarMonth/>
      <div class="bottom-navigation-calendar">
        <div class="reservation-info">
          <div class="some-reservations">Algunas reservaciones</div>
          <div class="full">Fecha llena</div>
        </div>
        <AddButton
          @click.prevent="$router.push('/crear-reservacion')"
        >
          Crear reservación
        </AddButton>
      </div>
    </div>
    <div class="responsive-calendar">
      <div class="bottom-navigation-calendar">
        <AddButton
          @click.prevent="$router.push('/crear-reservacion')"
        >
          Crear reservación
        </AddButton>
      </div>
      <ResponsiveCalendar/>
    </div>
  </div>
</template>

<script>
import CalendarMonth from '../components/Calendar/CalendarMonth.vue'
import AddButton from '../components/AddButton.vue'
import ResponsiveCalendar from '../components/Calendar/ResponsiveCalendar.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Calendario',
  components: {
    CalendarMonth,
    AddButton,
    ResponsiveCalendar
  },

  computed: {
    ...mapGetters(['allReservations'])
  },

  created() {
    this.getAllReservations()
  },

  methods: {
    ...mapActions(['getAllReservations']),
  }
}

</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .bottom-navigation-calendar {
    display: flex;
    justify-content: space-between;
    color: $font_color;
  }

  .some-reservations {
    position: relative;
    &::before {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
      content: '';
      width: 15px;
      height: 15px;
      background: $some_reservations;
    }
  }

  .full {
    position: relative;
    &::before {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
      content: '';
      width: 15px;
      height: 15px;
      background: $full;
    }
  }

  .responsive-calendar {
    display: none;
  }

  @include up_to('md') {
    .calendar {
      display: none;
    }

    .responsive-calendar {
      display: block;
    }
  }

</style>
