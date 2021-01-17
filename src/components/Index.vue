<template>
  <div class="w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md m-auto">
    <Branch
      :json="trees"
      name="Sources:"
    />
  </div>
</template>

<script>
import Branch from './Branch.vue';

export default {
  components: { Branch },

  props: {
    json: { type: Object, default: () => new Object() },
  },

  computed: {
    trees: function () {
      let trees = {};

      for (let path in this.json) {
        path.split('/').reduce(function (acc, dir) {
          if (dir.includes(':')) {
            let [file] = dir.split(':');
            acc[file] = acc[file] || [];
            acc[file].push(this.json[path]);
          } else {
            acc[dir] = acc[dir] || {};
            return acc[dir];
          }
        }.bind(this), trees);
      }

      return trees;
    },
  },
};
</script>

<style>
</style>
