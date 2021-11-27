import Vue from 'vue';
import VueBeam from '@crishellco/vue-beam';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default () => {
  Vue.use(VueBeam, { ...options });
};
