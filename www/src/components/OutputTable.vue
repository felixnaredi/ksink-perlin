<template>
  <canvas ref="outputTableCanvas" class="border-2"></canvas>
</template>

<script>
import { useEngineStore } from "../stores/engine";

export default {
  data: () => ({
    engine: useEngineStore(),
  }),
  computed: {
    canvas() {
      return this.$refs.outputTableCanvas;
    },
  },
  methods: {
    updateCanvasResolution() {
      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;
    },
  },
  mounted() {
    this.engine.setCanvas(this.canvas);

    this.updateCanvasResolution();
    this.engine.render();

    // Redraw canvas when some state of engine changes.
    this.engine.$subscribe(this.engine.render);

    // Update the size of the canvas and redraw when the window is resized.
    window.addEventListener("resize", () => {
      this.updateCanvasResolution();
      this.engine.render();
    });
  },
};
</script>
