import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  },
  render: h => h(App),
});
