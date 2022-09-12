import { defineStore } from "pinia";
import { RenderStateDescriptor } from "../../dist/wasm";

export const useEngineStore = defineStore("engine", {
  state: () => ({
    seed: BigInt(0),
    height: Number(5),
    width: Number(11),
  }),
  actions: {
    async makeRenderState(canvas: HTMLCanvasElement) {
      return import("../../dist/wasm").then(
        (wasm) =>
          new wasm.RenderStateDescriptor(
            this.height,
            this.width,
            this.seed,
            canvas
          )
      );
    },
    async render(state: RenderStateDescriptor) {
      import("../../dist/wasm").then((wasm) => wasm.render(state));
    },
  },
});
