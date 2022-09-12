<template>
  <canvas
    ref="outputTableCanvas"
    class="border-2"
    :height="clientHeight"
    :width="clientWidth"
  ></canvas>
</template>

<script>
import { useEngineStore } from "../stores/engine";

export default {
  data: () => ({
    engine: useEngineStore(),
    clientHeight: 0,
    clientWidth: 0,
  }),
  computed: {
    canvas() {
      return this.$refs.outputTableCanvas;
    },
  },
  methods: {
    range: (n) => {
      return Array(n)
        .fill(0)
        .map((_, i) => i);
    },
    updateCanvasResolution() {
      this.clientHeight = this.canvas.clientHeight;
      this.clientWidth = this.canvas.clientWidth;
    },
    draw() {
      this.engine
        .makeRenderState(this.canvas)
        .then((state) => this.engine.render(state));
    },
  },
  mounted() {
    this.updateCanvasResolution();
    this.draw();

    // Redraw canvas when some state of engine changes.
    this.engine.$subscribe(this.draw);

    // Update the size of the canvas and redraw when the window is resized.
    window.addEventListener("resize", this.updateCanvasResolution);
    window.addEventListener("resize", this.draw);
  },
};
</script>
