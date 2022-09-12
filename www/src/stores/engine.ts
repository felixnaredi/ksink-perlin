import { defineStore } from "pinia";
import { RenderPipelineState, RenderStateDescriptor } from "../../dist/wasm";

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
     * Creates a `RenderStateDescriptor` for a `HTMLCanvasElement`.
     *
     * @returns A `RenderStateDescriptor`.
     */
    createRenderStateDescriptor() {
      return new RenderStateDescriptor(
        this.resolutionY,
        this.resolutionX,
        this.seed
      );
    },

    /**
     * Renders the current state.
     */
    render() {
      this.renderPipelineState.render(this.createRenderStateDescriptor());
    },
  },
});
