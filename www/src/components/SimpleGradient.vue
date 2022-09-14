<template>
  <div>
    <div class="flex justify-between">
      <span>Color 0</span>
      <input
        type="color"
        :value="engine.gradient.color0.hex()"
        @input="
          (event) =>
            (engine.gradient.color0 = parseHexColor(event.target.value))
        "
      />
    </div>
    <div class="flex justify-between">
      <span>Color 1</span>
      <input
        type="color"
        :value="engine.gradient.color1.hex()"
        @input="
          (event) =>
            (engine.gradient.color1 = parseHexColor(event.target.value))
        "
      />
    </div>
    <!-- 
        TODO:
          Maybe a regular slider is not the best choice. The maximum value could go up to 255 but 
          the difference is barely visible past 20.
    -->
    <labled-slider
      class="py-1"
      label="Steps"
      :min="2"
      :max="32"
      :value="engine.gradient.steps"
      @input="(event) => (engine.gradient.steps = Number(event.target.value))"
    />
  </div>
</template>

<script>
import { parseHexColor } from "../library/gradient";
import { useEngineStore } from "../stores/engine";
import LabledSlider from "./LabledSlider.vue";

export default {
  components: { LabledSlider },
  data: () => ({
    engine: useEngineStore(),
  }),
  methods: {
    parseHexColor(value) {
      return parseHexColor(value);
    },
  },
};
</script>