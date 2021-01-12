import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

import Contract from './components/Contract.vue';
import Index from './components/Index.vue';

const routes = [
  {
    path: '/',
    component: Index,
    props: () => ({ json: process.env.DOCGEN_DATA }),
  },
  {
    path: '*',
    component: Contract,
    props: (route) => ({ json: process.env.DOCGEN_DATA[route.path.slice(1)] }),
  },
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  },
  render: h => h(App),
});
