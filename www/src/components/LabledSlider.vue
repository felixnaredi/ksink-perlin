<template>
  <div class="grid grid-cols-8">
    <span class="col-span-3">{{ label }}</span>
    <span class="col-span-5">{{ value }}</span>
    <input
      type="range"
      class="col-span-8"
      :value="value"
      :min="min"
      :max="max"
      @input="(event) => $emit('input', event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    min: Number,
    max: Number,
    value: Number,
  },
};
</script>