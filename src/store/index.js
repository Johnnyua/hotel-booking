import Vue from 'vue';
import Vuex from 'vuex';
import { bookingStore } from './booking';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    booking: bookingStore,
  },
});
