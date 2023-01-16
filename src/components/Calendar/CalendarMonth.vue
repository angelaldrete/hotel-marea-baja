<template>
  <Loading v-if="loading"/>
  <div class="calendar-month" v-else>
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :currentDate="today"
        :selectedDate="selectedDate"
        @dateSelected="selectDate"
        class="calendar-month-header-selected-month"
      />
    </div>

    <CalendarWeekdays/>

    <ol class="days-grid" v-if="reservationsByMonth && reservationsByMonth.length > 0">
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
          :reservations="reservationsByMonth"
        />
    </ol>
    <ol class="days-grid" v-else>
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
        />
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";
require('dayjs/locale/es')
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarMonthDayItem from "./CalendarMonthDayItem";
import CalendarDateIndicator from "./CalendarDateIndicator";
import CalendarWeekdays from "./CalendarWeekdays";
import { mapActions } from 'vuex';
import axios from 'axios'
import Loading from '../../components/Loading.vue'

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "CalendarMonth",

  components: {
    CalendarMonthDayItem,
    CalendarDateIndicator,
    CalendarWeekdays,
    Loading
  },

  async created() {
    this.reservationsByMonth = await this.fillMonthlyReservations(this.today)
    this.loading = false
  },

  data() {
    return {
      loading: true,
      selectedDate: dayjs().locale('es'),
      reservationsByMonth: []
    };
  },

  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays
      ];
    },

    today() {
      return dayjs().format("YYYY-MM-DD");
    },

    month() {
      return Number(this.selectedDate.format("M"));
    },

    year() {
      return Number(this.selectedDate.format("YYYY"));
    },

    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: true
        };
      });
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      );
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        "month"
      );

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday 
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() +
                1}-${previousMonthLastMondayDayOfMonth + index}`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false
          };
        }
      );
    },

    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`
      );

      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 6 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false
        };
      });
    },
  },

  methods: {
    ...mapActions(['fetchReservationsByMonth']),
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
      this.fillMonthlyReservations(newSelectedDate.$d)
    },

    async fillMonthlyReservations(date) {
      const theDate = new Date(date)
      const month = theDate.getMonth() + 1
      const year = theDate.getFullYear()
      const res = await axios.get(
        `${process.env.VUE_APP_API_ENDPOINT}/reservations/${month}/${year}`
      );
      return res.data;
    }
  }
};
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

.calendar-month {
  position: relative;
  margin-right: 100px;
  margin-bottom: 40px;
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  list-style: none;
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border: solid 1px #333;
}

.calendar-month-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  padding-bottom: 20px;
}

</style>
