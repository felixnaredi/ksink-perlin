<template>
  <div class="bg-slate-300 p-6 h-full">
    <div class="py-4">
      <span class="block pb-1">Generator</span>
      <select v-model="selectedGenerator" class="w-full py-1">
        <option
          v-for="generator in engine.generators"
          :key="generator.label"
          :value="generator.label"
        >
          {{ generator.label }}
        </option>
      </select>
      <bit-layout-32 v-if="selectedGenerator == 'PHash'" class="mt-2" />
    </div>
    <labled-slider
      label="Resolution Y"
      class="py-4"
      :min="minResolution"
      :max="maxResolution"
      :value="engine.clampedResolutionY"
      @input="(event) => (engine.resolutionY = Number(event.target.value))"
    />
    <labled-slider
      label="Resolution X"
      class="py-4"
      :min="minResolution"
      :max="maxResolution"
      :value="engine.clampedResolutionX"
      @input="(event) => (engine.resolutionX = Number(event.target.value))"
    />
    <div class="py-4">
      <span class="block pb-1">Seed (t)</span>
      <input
        class="px-1 block w-full"
        :value="engine.clampedSeed"
        @input="
          (event) =>
            (engine.seed = engine.generator.SeedType(event.target.value))
        "
      />
    </div>
    <simple-gradient class="py-4" />
  </div>
</template>

<script>
import { useEngineStore } from "../stores/engine";
import BitLayout32 from "./BitLayout32.vue";
import LabledSlider from "./LabledSlider.vue";
import SimpleGradient from "./SimpleGradient.vue";

export default {
  components: { LabledSlider, SimpleGradient, BitLayout32 },
  data: () => ({
    engine: useEngineStore(),
    selectedGenerator: null,
  }),
  computed: {
    minResolution() {
      return this.engine.generator.minResolution;
    },
    maxResolution() {
      return Math.min(this.engine.generator.maxResolution, 511);
    },
  },
  created() {
    this.selectedGenerator = this.engine.generator.label;
  },
  watch: {
    selectedGenerator(value) {
      this.engine.setGeneratorByLabel(value);
    },
  },
};
</script>
