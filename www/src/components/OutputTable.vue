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
      this.engine.fill().then((table) => {
        let ctx = this.canvas.getContext("2d");

        ctx.save();
        ctx.transform(
          this.clientWidth / this.engine.width,
          0,
          0,
          this.clientHeight / this.engine.height,
          0,
          0
        );

        this.range(this.engine.height).forEach((y) => {
          this.range(this.engine.width).forEach((x) => {
            const k = Number(table[y][x] % 16n);
            const g = 17 * k;
            const b = 17 * (15 - k);

            ctx.fillStyle = `rgba(0, ${g}, ${b}, 255)`;
            ctx.fillRect(x, y, 1, 1);

            // Stroking the rect lessens artifacts from rounding.
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = `rgba(0, ${g}, ${b}, 255)`;
            ctx.strokeRect(x, y, 1, 1);
          });
        });

        ctx.restore();
      });
    },
  },
  mounted() {
    // Redraw canvas when some state of engine changes.
    this.engine.$subscribe(this.draw);

    // Update the size of the canvas and redraw when the window is resized.
    window.addEventListener("resize", this.updateCanvasResolution);
    window.addEventListener("resize", this.draw);

    this.updateCanvasResolution();
    this.draw();
  },
};
</script>