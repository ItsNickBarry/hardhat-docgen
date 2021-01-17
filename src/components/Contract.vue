<template>
  <div class="w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md m-auto">
    <div class="space-y-4">
      <h1 class="text-xl">{{ json.name }} ({{ json.source }})</h1>

      <h2 class="text-lg">
        {{ json.title }}
      </h2>

      <h2 class="text-lg">
        {{ json.author }}
      </h2>

      <p>{{ json.notice }}</p>

      <p>{{ json.details }}</p>
    </div>

    <Member
      v-if="json.hasOwnProperty('constructor')"
      :json="json.constructor"
    />
    <Member v-if="json.receive" :json="json.receive" />
    <Member v-if="json.fallback" :json="json.fallback" />

    <MemberSet v-if="json.events" title="Events" :json="json.events" />

    <MemberSet
      v-if="json.stateVariables"
      title="State Variables"
      :json="json.stateVariables"
    />

    <MemberSet v-if="json.methods" title="Methods" :json="json.methods" />
  </div>
</template>

<script>
import Member from './Member.vue';
import MemberSet from './MemberSet.vue';

export default {
  components: { Member, MemberSet },

  props: {
    json: { type: Object, default: () => new Object() }
  }
};
</script>
