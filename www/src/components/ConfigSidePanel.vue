<template>
  <div class="bg-lightgrey p-05em">
    <div class="range-input-container p-025em">
      <span class="monospace delim">Height</span>
      <span class="monospace">{{ height }}</span>
      <input
        type="range"
        :value="height"
        min="1"
        max="32"
        @input="(event) => (height = event.target.value)"
      />
    </div>
    <div class="range-input-container p-025em">
      <span class="monospace delim">Width</span>
      <span class="monospace">{{ width }}</span>
      <input
        type="range"
        :value="width"
        min="1"
        max="32"
        @input="(event) => (width = event.target.value)"
      />
    </div>
    <div class="p-025em">
      <span class="monospace delim">Seed</span>
      <input v-model="seed" />
    </div>
  </div>
</template>

<script>
import { useEngineStore } from "../stores/engine";

export default {
  data: () => ({
    height: useEngineStore().height,
    width: useEngineStore().width,
    seed: useEngineStore().seed,
  }),
  watch: {
    height() {
      useEngineStore().height = Number(this.height);
    },
    width() {
      useEngineStore().width = Number(this.width);
    },
    seed() {
      useEngineStore().seed = BigInt(this.seed);
    },
  },
};
</script>

<style scoped>
.range-input-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>