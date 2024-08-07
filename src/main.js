import App from './App.vue';
import Contract from './components/Contract.vue';
import Index from './components/Index.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const data = process.env.DOCGEN_DATA;

const routes = [
  {
    path: '/',
    component: Index,
    props: () => ({ json: data }),
  },
  {
    path: '*',
    component: Contract,
    props: (route) => ({ json: data[route.path.slice(1)] }),
  },
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  },
  render: (h) => h(App),
});
