import './assets/style.css';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import componentsUI from './components/ui/index.js';
import components from './components/index.js';
 

componentsUI.forEach((component) => {
  Vue.component(component.name, component);
});
components.forEach((component) => {
  Vue.component(component.name, component);
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
