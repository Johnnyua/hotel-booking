<template>
  <div id="app">
    <BookingSchedulePage />
  </div>
</template>

<script>
import BookingSchedulePage from './pages/BookingSchedulePage.vue';

export default {
  name: 'App',
  components: {
    BookingSchedulePage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  padding: 10px;
}
</style>
