<template>
  <div class="w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md m-auto">
    <p
      v-for="path in Object.keys(json)"
      :key="path"
    >
      <router-link :to="path">
        {{ path }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    json: { type: Object, default: () => new Object() },
  },
};
</script>

<style>
</style>
