import { defineStore } from "pinia";
import {
  RenderPipelineState,
  KSINKOutputTextureDescriptor,
  PHashOutputTextureDescriptor,
} from "../../dist/wasm";

export enum Generator {
  KSINK,
  PHash,
}

export const useEngineStore = defineStore("engine", {
  state: () => ({
    seed: BigInt(0),
    resolutionY: Number(5),
    resolutionX: Number(11),
    renderPipelineState: null,
    generator: Generator.KSINK,
  }),
  actions: {
    setCanvas(canvas: HTMLCanvasElement) {
      this.renderPipelineState = new RenderPipelineState(canvas);
    },

    /**
     * Renders the current state.
     */
    render() {
      if (this.generator == Generator.KSINK) {
        this.renderPipelineState.render(
          new KSINKOutputTextureDescriptor(
            this.resolutionY,
            this.resolutionX,
            this.seed
          ).generate()
        );
      } else if (this.generator == Generator.PHash) {
        this.renderPipelineState.render(
          new PHashOutputTextureDescriptor(
            this.resolutionY,
            this.resolutionX,
            Number(this.seed)
          ).generate()
        );
      }
    },
  },
});
