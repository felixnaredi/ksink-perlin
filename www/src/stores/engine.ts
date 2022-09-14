import { defineStore } from "pinia";
import {
  RenderPipelineState,
  KSINKOutputTextureDescriptor,
} from "../../dist/wasm";

export const useEngineStore = defineStore("engine", {
  state: () => ({
    seed: BigInt(0),
    resolutionY: Number(5),
    resolutionX: Number(11),
    renderPipelineState: null,
  }),
  actions: {
    setCanvas(canvas: HTMLCanvasElement) {
      this.renderPipelineState = new RenderPipelineState(canvas);
    },

    /**
     * Renders the current state.
     */
    render() {
      this.renderPipelineState.render(
        new KSINKOutputTextureDescriptor(
          this.resolutionY,
          this.resolutionX,
          this.seed
        ).generate()
      );
    },
  },
});
