<template>
  <div>
    <span>Input Layout</span>
    <div v-for="offset in offsets" :key="offset" class="grid grid-cols-5">
      <span class="col-span-2 pl-4">Offset</span>
      <span class="text-right">{{ offset }}</span>
      <span class="ml-1">:</span>
      <select @input="(event) => updateOptions(offset, event.target.value)">
        <option
          v-for="dimension in dimensions"
          :key="dimension.label"
          :value="dimension.value"
          :selected="engine.options.offsets[offset] == dimension.value"
        >
          {{ dimension.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { Dimension } from "../../dist/wasm";
import { useEngineStore } from "../stores/engine";

export default {
  data: () => ({
    engine: useEngineStore(),
  }),
  computed: {
    dimensions: () => [
      { label: "t", value: Dimension.T },
      { label: "z", value: Dimension.Z },
      { label: "y", value: Dimension.Y },
      { label: "x", value: Dimension.X },
    ],
    offsets() {
      return [0, 8, 16, 24];
    },
  },
  methods: {
    updateOptions(offset, value) {
      this.engine.options.offsets[offset] = Number(value);
      console.log(this.engine.options);
    },
  },
};
</script>