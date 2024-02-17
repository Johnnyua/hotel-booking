<template>
  <div class="calendar__container">
    <div class="calendar__header">
      <div class="calendar__header__btns">
        <v-button
          class="calendar__header__btns__prev"
          @click.native="handlePrev"
          >&lt;</v-button
        >
        <v-button
          class="calendar__header__btns__today"
          v-on:click.native="handleToday"
          >Today</v-button
        >
        <v-button
          class="calendar__header__btns__next"
          v-on:click.native="handleNext"
          >&gt;</v-button
        >
      </div>
    </div>
    <div class="calendar__table__wrapper">
      <div class="calendar__table__rooms">
        <div class="calendar__table__rooms__table">
          <div class="calendar__table__rooms__roomname"></div>
          <div
            class="calendar__table__rooms__roomname"
            v-for="(roomname, key) in bookings"
            :key="key"
          >
            {{ key }}
          </div>
        </div>
      </div>
      <div class="calendar__table__booking">
        <div class="calendar__table__booking__header dates">
          <div
            class="calendar__table__booking__header__date date"
            v-bind:class="{ today: todayLocaleString === date }"
            v-for="(date, index) in datesLocaleString"
            :key="index"
          >
            <div class="calendar__table__booking__header__text">
              {{ date.split('.')[0] }}.
            </div>
            <div class="calendar__table__booking__header__text">
              {{ date.split('.')[1] }}.
            </div>
            <div class="calendar__table__booking__header__text">
              {{ date.split('.')[2] }}
            </div>
          </div>
        </div>
        <div class="calendar__table__booking__body">
          <div
            class="calendar__table__booking__body__room"
            v-for="(roomname, key) in bookings"
            :key="key"
          >
            <div
              class="calendar__table__booking__body__date date"
              v-bind:class="{ today: todayLocaleString === date }"
              v-for="(date, dateIndex) in datesLocaleString"
              :key="dateIndex"
            ></div>
            <div
              class="calendar__table__booking__body__details"
              v-for="bookingDetail in roomname"
              :key="bookingDetail.id"
              :style="{
                width: calcWidth(bookingDetail.start, bookingDetail.end).width,
                left: calcWidth(bookingDetail.start, bookingDetail.end).left,
              }"
              :class="{
                no_border_left: getBookingPeriodBorder(
                  bookingDetail.start,
                  bookingDetail.end
                ).isStart,
                no_border_right: getBookingPeriodBorder(
                  bookingDetail.start,
                  bookingDetail.end
                ).isEnd,
              }"
              @click="() => handleCkeckBooking(bookingDetail)"
            >
              <span style="color: white">{{ bookingDetail.name }}</span>
              <v-modal
                class="calendar__table__booking__body__details__modal"
                :show="bookingDetail.id === showModalId && showModal"
                @update:show="onModalClose"
              >
                <v-booking-card
                  :bookingCard="bookingDetail"
                  @onclosecard.stop="onCloseCard"
                ></v-booking-card>
              </v-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertStringDateToLocaleDate } from '../helpers';

export default {
  name: 'vCalendar',
  emits: ['onprev', 'ontoday', 'onnext'],
  data() {
    return {
      showModalId: 0,
      showModal: false,
      bookingDetail: {},
    };
  },
  props: {
    today: Date,
    dates: {
      type: Array,
      default: () => [],
      required: true,
    },
    bookings: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  methods: {
    handleCkeckBooking(bookingDetail) {
      this.bookingDetail = bookingDetail;
      this.showModalId = bookingDetail.id;
      this.showModal = true;
    },
    handlePrev(e) {
      this.$emit('onprev', e);
    },
    handleToday(e) {
      this.$emit('ontoday', e);
    },
    handleNext(e) {
      this.$emit('onnext', e);
    },
    calcWidth(dateStart, dateEnd) {
      let width = 0;
      let left = 0;
      const { indexStart, indexEnd, isStart, isEnd } =
        this.getBookingPeriodBorder(dateStart, dateEnd);
      const positionStart = indexStart + 1;
      const positionEnd = indexEnd + 1;
      if (isStart) {
        width = `calc(100% / ${this.datesLocaleString.length} * ${
          positionEnd - positionStart
        }  - (100% / ${this.datesLocaleString.length} / 2) - 1px)`;
      } else if (isEnd) {
        width = `calc(100% / ${this.datesLocaleString.length} * ${
          positionEnd - positionStart
        }  - (100% / ${this.datesLocaleString.length} / 2))`;
      } else {
        width = `calc(100% / ${this.datesLocaleString.length} * ${
          positionEnd - positionStart
        } - 1px)`;
      }

      if (isStart) {
        left = 0;
      } else {
        left = `calc(100% / ${this.datesLocaleString.length} * ${positionStart} - (100% / ${this.datesLocaleString.length} / 2)`;
      }

      return { width, left };
    },
    getBookingPeriodBorder(dateStart, dateEnd) {
      let isStart = false;
      let isEnd = false;
      const dateStartToLocaleDate = convertStringDateToLocaleDate(dateStart);
      const dateEndToLocaleDate = convertStringDateToLocaleDate(dateEnd);
      let indexStart = this.datesLocaleString.findIndex(
        (item) => item === dateStartToLocaleDate
      );
      let indexEnd = this.datesLocaleString.findIndex(
        (item) => item === dateEndToLocaleDate
      );
      if (indexStart === -1) {
        indexStart = -1;
        isStart = true;
      }
      if (indexEnd === -1) {
        indexEnd = this.datesLocaleString.length;
        isEnd = true;
      }
      return { indexStart, indexEnd, isStart, isEnd };
    },
    onModalClose(show) {
      this.showModal = show;
    },
    onCloseCard() {
      this.showModal = false;
    },
  },
  computed: {
    todayLocaleString() {
      return this.today.toLocaleDateString();
    },
    datesLocaleString() {
      return [...this.dates].map((item) => item.toLocaleDateString());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar__container,
.date,
.calendar__table__rooms__roomname:not(:first-child) {
  border: 1px solid #000;
  border-color: lightgray;
}

.calendar__container,
.calendar__header {
  padding: 10px;
}
.calendar__container,
.calendar__table__wrapper,
.calendar__header__btns,
.calendar__table__rooms__roomname,
.calendar__table__booking__header,
.date,
.calendar__header,
.calendar__table__booking,
.calendar__table__booking__body__room {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.calendar__table__booking__body__room {
  position: relative;
}

.date,
.calendar__table__rooms__roomname {
  align-items: center;
  color: teal;
  font-weight: 700;
}

.date {
  flex: 1 0 0;
}

.calendar__table__booking__header {
  justify-content: flex-start;
}
.calendar__container,
.calendar__table__booking {
  flex-direction: column;
}

.calendar__table__wrapper,
.calendar__table__booking__body {
  position: relative;
  width: 100%;
}

.calendar__header__btns {
  justify-content: flex-start;
  gap: 5px;
}
.date:not(:last-child) {
  border-right: none;
}
.calendar__table__booking__body {
  border-right: 2px solid #000;
  border-bottom: 1px solid #000;
  border-color: lightgray;
}

.date {
  padding: 10px;
}
.calendar__table__rooms__roomname,
.date {
  min-height: 100px;
}
@media (max-width: 950px) {
  .date {
    flex-direction: column;
  }
}
.today {
  background-color: #6ac4c4;
}

.calendar__table__booking__body__details {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 50px;
  background-color: teal;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.no_border_left {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.no_border_right {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.calendar__table__booking__body__details__modal {
  position: absolute;
  bottom: 50%;
  left: 0;
  z-index: 999;
}
</style>
