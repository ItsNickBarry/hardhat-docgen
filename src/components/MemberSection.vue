<template>
  <ul v-if="puts.length > 0">
    <h4 class="text-lg">
      {{ name }}
    </h4>
    <li
      v-for="(put, index) in puts"
      :key="index"
    >
      <span class="bg-gray-300">{{ put.type }}</span>
      <b>{{ put.name || `_${index}` }}</b><span v-if="put.desc">: <i>{{ put.desc }}</i></span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['puts', 'name'],
};
</script>
