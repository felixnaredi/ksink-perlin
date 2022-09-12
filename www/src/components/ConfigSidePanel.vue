<template>
  <div class="bg-slate-300 p-6 h-full">
    <labled-slider
      label="Resolution Y"
      class="py-4"
      :min="minSize"
      :max="maxSize"
      :value="engine.resolutionY"
      @input="(event) => (engine.resolutionY = Number(event.target.value))"
    />
    <labled-slider
      label="Resolution X"
      class="py-4"
      :min="minSize"
      :max="maxSize"
      :value="engine.resolutionX"
      @input="(event) => (engine.resolutionX = Number(event.target.value))"
    />
    <div class="py-4">
      <span class="block pb-1">Seed</span>
      <input
        class="px-1 block w-full"
        :value="engine.seed"
        @input="(event) => (engine.seed = BigInt(event.target.value))"
      />
    </div>
  </div>
</template>

<script>
import { useEngineStore } from "../stores/engine";
import LabledSlider from "./LabledSlider.vue";

export default {
  components: { LabledSlider },
  data: () => ({
    engine: useEngineStore(),
    minSize: 1,
    maxSize: 256,
  }),
};
</script>
