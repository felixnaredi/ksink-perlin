<template>
  <div class="bg-slate-300 p-6 h-full">
    <div class="py-4">
      <span class="block pb-1">Generator</span>
      <select v-model="selectedGenerator" class="w-full py-1">
        <option value="KSINK">KSINK</option>
        <option value="PHash">PHash</option>
      </select>
    </div>
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
import { Generator } from "../stores/engine";

export default {
  components: { LabledSlider },
  data: () => ({
    engine: useEngineStore(),
    minSize: 1,
    maxSize: 256,
    selectedGenerator: null,
  }),
  methods: {
    generatorToString: (generator) => {
      if (generator == Generator.KSINK) {
        return "KSINK";
      } else if (generator == Generator.PHash) {
        return "PHash";
      }
    },
    stringToGenerator: (s) => {
      if (s == "KSINK") {
        return Generator.KSINK;
      } else if (s == "PHash") {
        return Generator.PHash;
      }
    },
  },
  created() {
    this.selectedGenerator = this.generatorToString(this.engine.generator);
  },
  watch: {
    selectedGenerator(value) {
      this.engine.generator = this.stringToGenerator(value);
    },
  },
};
</script>
