<template>
  <ol class="day-of-week">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<script>
const WEEKDAYS = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

export default {
  name: "CalendarWeekdays",

  computed: {
    weekdays() {
      return WEEKDAYS;
    }
  }
};
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

  .day-of-week {
    display: grid;
    list-style: none;
    grid-template-columns: repeat(7, 1fr);
    & > * {
      font-size: 13px;
      font-weight: 500;
      color: $calendar_font_color;
      text-align: left;
      padding-right: 5px;
    }
  }

</style>
