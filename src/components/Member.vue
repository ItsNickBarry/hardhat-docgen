<template>
  <div class="member w-full">
    <h3>{{ name }} <code>{{ keywords }} {{ inputSignature }}</code></h3>

    <p>{{ json.notice }}</p>

    <p>{{ json.details }}</p>

    <ul v-if="inputs.length > 0">
      <h4>Parameters</h4>
      <li
        v-for="(input, index) in inputs"
        :key="index"
      >
        <code>{{ input.type }}</code> <b>{{ input.name }}</b>: <i>{{ input.desc }}</i>
      </li>
    </ul>

    <ul v-if="outputs.length > 0">
      <h4>Return Values</h4>
      <li
        v-for="(output, index) in outputs"
        :key="index"
      >
        <code>{{ output.type }}</code> <b>{{ output.name || `_${ index }` }}</b>: <i>{{ output.desc }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    json: { type: Object, default: () => new Object() },
  },

  computed: {
    name: function () {
      // special functions are unnamed; default to type
      return this.json.name || this.json.type;
    },

    keywords: function () {
      let keywords = [];

      if (this.json.stateMutability) {
        keywords.push(this.json.stateMutability);
      }

      if (this.json.anonymous === 'true') {
        keywords.push('anonymous');
      }

      return keywords.join(' ');
    },

    params: function () {
      return this.json.params || {};
    },

    returns: function () {
      return this.json.returns || {};
    },

    inputs: function () {
      return (this.json.inputs || []).map(i => ({ ...i, desc: this.params[i.name] }));
    },

    inputSignature: function () {
      return `(${ this.inputs.map(i => i.type).join(',') })`;
    },

    outputs: function () {
      return (this.json.outputs || []).map((i, index) => ({ ...i, desc: this.returns[i.name || `_${ index }`] }));
    },

    outputSignature: function () {
      return `(${ this.outputs.map(i => i.type).join(',') })`;
    },
  },
};
</script>

<style>
code {
  background: lightgray;
}

.member {
  margin-top: 10px;
  border: 1px dashed gray;
}
</style>
