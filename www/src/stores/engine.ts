import { defineStore } from "pinia";
import {
  RenderPipelineState,
  KSINKOutputTextureDescriptor,
  PHashOutputTextureDescriptor,
  OutputTexture,
} from "../../dist/wasm";

interface OutputTextureDescriptor {
  generate(): OutputTexture;
}

interface Generator {
  readonly SeedType: NumberConstructor | BigIntConstructor;

  readonly label: string;
  readonly minResolution: number;
  readonly maxResolution: number;
  readonly maxSeedValue: number | bigint;

  createOutputTextureDescriptor(
    resolutionY: number,
    resolutionX: number,
    seed: number | bigint
  ): OutputTextureDescriptor;
}

class KSINK implements Generator {
  public readonly SeedType = BigInt;

  public readonly label: string = "KSINK";
  public readonly minResolution: number = 1;
  public readonly maxResolution: number = 4294967295;
  public readonly maxSeedValue: bigint = BigInt("18446744073709551615");

  public createOutputTextureDescriptor(
    resolutionY: number,
    resolutionX: number,
    seed: bigint
  ) {
    return new KSINKOutputTextureDescriptor(resolutionY, resolutionX, seed);
  }
}

class PHash implements Generator {
  public readonly SeedType = Number;

  public readonly label: string = "PHash";
  public readonly minResolution: number = 1;
  public readonly maxResolution: number = 255;
  public readonly maxSeedValue: number = 255;

  public createOutputTextureDescriptor(
    resolutionY: number,
    resolutionX: number,
    seed: number
  ) {
    return new PHashOutputTextureDescriptor(resolutionY, resolutionX, seed);
  }
}

function clampNumber(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}

export const useEngineStore = defineStore("engine", {
  state: () => ({
    seed: BigInt(0),
    resolutionY: Number(5),
    resolutionX: Number(11),
    renderPipelineState: null,
    generator: new KSINK(),
  }),
  getters: {
    generators: () => [new KSINK(), new PHash()],

    /**
     * The current resolution height clamped between the least and greatest value possible for the
     * selected generator.
     *
     * @returns The clamped value.
     */
    clampedResolutionY() {
      return clampNumber(
        this.resolutionY,
        this.generator.minResolution,
        this.generator.maxResolution
      );
    },

    /**
     * The current resolution width clamped between the least and greatest value possible for the
     * selected generator.
     *
     * @returns The clamped value.
     */
    clampedResolutionX() {
      return clampNumber(
        this.resolutionX,
        this.generator.minResolution,
        this.generator.maxResolution
      );
    },

    /**
     * The current resolution width clamped between the least and greatest value possible for the
     * selected generator.
     *
     * TODO:
     *   It is probably better if exceeding the maximum seed value throws an error.
     *
     * @returns The clamped value.
     */
    clampedSeed() {
      if (this.seed > this.generator.maxSeedValue) {
        return this.generator.maxSeedValue;
      } else {
        return this.seed;
      }
    },
  },
  actions: {
    setCanvas(canvas: HTMLCanvasElement) {
      this.renderPipelineState = new RenderPipelineState(canvas);
    },

    setGeneratorByLabel(label: string) {
      for (const generator of this.generators) {
        if (generator.label == label) {
          this.generator = generator;
          return;
        }
      }
      throw `No generator with label '${label}'`;
    },

    /**
     * Renders the current state.
     */
    render() {
      this.renderPipelineState.render(
        this.generator
          .createOutputTextureDescriptor(
            this.clampedResolutionY,
            this.clampedResolutionX,
            this.generator.SeedType(this.seed)
          )
          .generate()
      );
    },
  },
});
