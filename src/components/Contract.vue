<template>
  <div class="w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md m-auto">
    <code class="space-y-4">
      <h1 class="text-xl">
        name: {{ json.name }}
        <br>
        source: {{ json.source }}
        <br>
        author: {{ json.author }}
      </h1>

      <h2 class="text-lg">
        title: {{ json.title }}
      </h2>

      <p>details: {{ json.details }}</p>
      <p>notice: {{ json.notice }}</p>
    </code>

    <div class="w-full">
      <pre class="text-lg">events:</pre>
      <pre class="mt-4">{{ formatJson(json.events) }}</pre>
    </div>

    <div class="w-full">
      <pre class="text-lg">stateVariables:</pre>
      <pre class="mt-4">{{ formatJson(json.stateVariables) }}</pre>
    </div>

    <div class="w-full">
      <pre class="text-lg">methods:</pre>
      <pre class="mt-4">{{ formatJson(json.methods) }}</pre>
    </div>
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
