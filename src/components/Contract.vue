<template>
  <div class="w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md m-auto">
    <code class="space-y-4">
      <h1 class="text-xl">
        {{ json.name }} ({{ json.source }})
      </h1>

      <h2 class="text-lg">
        {{ json.title }}
      </h2>

      <h2 class="text-lg">
        {{ json.author }}
      </h2>

      <p>{{ json.notice }}</p>

      <p>{{ json.details }}</p>
    </code>

    <MemberSet
      title="Events"
      :json="json.events"
    />

    <MemberSet
      title="State Variables"
      :json="json.stateVariables"
    />

    <MemberSet
      title="Methods"
      :json="json.methods"
    />
  </div>
</template>

<script>
import MemberSet from './MemberSet.vue';

export default {
  components: { MemberSet },
  props: {
    json: { type: Object, default: () => new Object() },
  },
};
</script>

<style>
</style>
