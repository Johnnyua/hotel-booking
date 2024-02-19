<template>
  <div class="booking__card__wrapper card">
    <div class="booking__card__header card">
      <h1 class="booking__card__header__title title">
        {{ bookingCard.name }}
      </h1>
      <div class="booking__card__header__dates subtitle">
        {{ dateStart }} - {{ dateEnd }}  
      </div>
      <div class="booking__card__header__text card">
        <a
          class="booking__card__header__text__phone"
          :href="'tel:' + bookingCard.phone"
        >
          {{ bookingCard.phone }}
        </a>
        <a
          class="booking__card__header__text__email"
          :href="'mailto:' + bookingCard.email"
        >
          {{ bookingCard.email }}
        </a>
      </div>
    </div>
    <div class="booking__card__body card">
      <div class="booking__card__body__type">
        Type of apartments: {{ bookingCard.typeOfApartments }}
      </div>
      <div class="booking__card__body__guest card">
        <div class="booking__card__body__guest__title subtitle">
          Number of Guests:
        </div>
        <div class="booking__card__body__guest__adults">
          Adults: {{ bookingCard.guestInfo.adults }}
        </div>
        <div class="booking__card__body__guest__children">
          Children: {{ bookingCard.guestInfo.children }}
        </div>
      </div>
    </div>
    <div class="booking__card__footer">
      <v-button @click.native="handleCloseCard">Close</v-button>
    </div>
  </div>
</template>

<script>
import { convertStringDateToLocaleDate } from '../helpers';

export default {
  name: 'vBookingCard',
  emits: ['onclosecard'],
  props: {
    today: Date,
    bookingCard: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  methods: {
    handleCloseCard(e) {
      this.$emit('onclosecard', e);
    },
  },
  computed: {
    dateStart() {
      return convertStringDateToLocaleDate(this.bookingCard.start)
    },
    dateEnd() {
      return convertStringDateToLocaleDate(this.bookingCard.end)
    },
  },
};
</script>

<style scoped>
.booking__card__wrapper.card {
  gap: 10px;
}
.booking__card__header__title {
  border-bottom: 1px solid;
}
.booking__card__footer {
  border-top: 1px solid;
  width: 100%;
}
</style>
