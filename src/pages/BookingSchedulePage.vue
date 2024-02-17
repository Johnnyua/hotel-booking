<template>
  <div id="app">
    <h1>Calendar schedule</h1>
    <v-calendar
      :today="today"
      :dates="dates"
      :bookings="getBookingsByRoom"
      @onprev="loadPrevPeriod"
      @ontoday="jumpToday"
      @onnext="loadNextPeriod"
    />
  </div>
</template>

<script>
import { getStartWeekDate } from '../helpers';
import { hotelRoomNameList } from '../enums';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      dates: [],
      rooms: hotelRoomNameList,
      dateWeekStart: new Date(Date.now()),
      dateWeekStartToday: new Date(Date.now()),
      dayToday: new Date(Date.now()).getDay(),
      today: new Date(Date.now()),
      daysOfWeek: 7, // You can change showing days of week
    };
  },
  methods: {
    ...mapActions({
      loadBookings: 'booking/loadBookingsFromJSON',
    }),
    setWeekStart(date) {
      this.dateWeekStart = date;
    },
    setWeekStartToday(date) {
      this.dateWeekStartToday = date;
    },
    addDates() {
      let day = 0;
      this.dates = [];
      while (day < this.daysOfWeek) {
        const result = new Date(this.dateWeekStart);
        const newDate = new Date(result.setDate(result.getDate() + day));
        this.dates.push(newDate);
        day++;
      }
    },
    loadPrevPeriod() {
      const date = this.dateWeekStart.setDate(
        this.dateWeekStart.getDate() - this.daysOfWeek
      );
      this.dateWeekStart = new Date(date);
    },
    jumpToday() {
      this.dateWeekStart = getStartWeekDate(this.dateWeekStartToday);
    },
    loadNextPeriod() {
      const date = this.dateWeekStart.setDate(
        this.dateWeekStart.getDate() + this.daysOfWeek
      );
      this.dateWeekStart = new Date(date);
    },
  },
  computed: {
    ...mapState({
      bookings: (state) => state.booking.bookings,
    }),
    ...mapGetters({
      getBookingsByRoom: 'booking/getBookingsByRoom',
    }),
  },
  watch: {
    dateWeekStart() {
      this.addDates();
      this.loadBookings(this.dates);
    },
  },
  mounted() {
    this.setWeekStart(getStartWeekDate(Date.now()));
    this.setWeekStartToday(getStartWeekDate(Date.now()));
    this.addDates();
    this.loadBookings(this.dates);
  },
};
</script>

<style></style>
