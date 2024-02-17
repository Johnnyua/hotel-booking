import bookingData from '../mockdata/bookings.json';
import { hotelRoomNameList } from '../enums';

export const bookingStore = {
  state: () => ({
    bookings: [],
  }),
  getters: {
    getBookingsByRoom(state) {
      const rooms = {};
      hotelRoomNameList.forEach((item) => (rooms[item] = []));
      return state.bookings.reduce((acc, item) => {
        if (acc[item.roomDetails.name]) {
          acc[item.roomDetails.name].push(item);
        }
        return acc;
      }, rooms);
    },
  },
  mutations: {
    setBookings(state, bookings) {
      state.bookings = bookings;
    },
  },
  actions: {
    loadBookingsFromJSON({ commit }, datesList) {
      const dateListLocaleString = datesList.map((item) =>
        item.toLocaleDateString()
      );
      const bookings = bookingData;
      const filteredBookings = bookings.filter((item) => {
        const dateStart = new Date(item.start).toLocaleDateString();
        const dateEnd = new Date(item.end).toLocaleDateString();
        return (
          dateListLocaleString.includes(dateStart) ||
          dateListLocaleString.includes(dateEnd)
        );
      });
      commit('setBookings', filteredBookings);
    },
  },
  namespaced: true,
};
