<template>
  <div class="h-screen bg-gray-100 px-4 py-6">
    <Contract :json="json" />
  </div>
</template>

<script>
import Contract from './components/Contract.vue';

export default {
  components: { Contract },
  data () {
    return {
      json: process.env.DOCGEN_DATA[Object.keys(process.env.DOCGEN_DATA)[0]],
    };
  },
};
</script>

<style>
</style>
