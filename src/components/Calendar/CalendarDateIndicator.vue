<template>
  <div class="date-indicator">
    <span class="previous" @click="selectPrevious"></span>
    <h1 class="calendar-date-indicator">{{ selectedMonth }}</h1>
    <span class="next" @click="selectNext"></span>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    },
    currentDate: {
      type: String,
      required: true
    },
  },

  computed: {
    selectedMonth() {
      return this.selectedDate.format('MMMM YYYY')
    }
  },

  methods: {
    selectPrevious() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },

    selectCurrent() {
      let newSelectedDate = dayjs(this.currentDate);
      this.$emit("dateSelected", newSelectedDate);
    },

    selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    }
  }
};
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

  .calendar-date-indicator {
    display: inline-block;
    margin: 0 20px;
    font-size: 32px;
    font-weight: 700;
    color: $calendar_font_color;
    text-transform: capitalize;
    @include up_to('md') {
      font-size: 20px;
      margin: 10px 30px 10px;
    }
  }

  .next {
    cursor: pointer;
    @include icon('../../assets/img/right-arrow.svg', 15px);
  }

  .previous {
    cursor: pointer;
    @include icon('../../assets/img/left-arrow.svg', 15px);
  }

</style>

