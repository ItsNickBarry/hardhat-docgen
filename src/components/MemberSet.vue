<template>
  <div class="w-full">
    <pre class="text-lg">{{ title }}</pre>
    <Member
      v-for="sig in Object.keys(json)"
      :key="sig"
      :json="json[sig]"
    />
  </div>
</template>

<script>
import Member from './Member.vue';

export default {
  components: { Member },

  props: {
    title: { type: String, default: '' },
    json: { type: Object, default: () => new Object() },
  },
};
</script>

<style>
</style>
