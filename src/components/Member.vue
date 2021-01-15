<template>
  <div class="w-full">
    <h5>{{ json.name }}</h5>
    <h5>{{ json.stateMutability }}</h5>
    <pre class="mt-4">{{ formatJson(json) }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    json: { type: Object, default: () => new Object() },
  },

  methods: {
    formatJson: function (json = []) {
      return JSON.stringify(json, null, 2).replace(/"|{|}|,/gi, '');
    },
  },
};
</script>

<style>
</style>
