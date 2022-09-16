import {
  KSINKOutputTextureDescriptor,
  PHashOutputTextureDescriptor,
  OutputTexture,
  WasmGradient,
  Dimension,
} from "../../dist/wasm";

interface OutputTextureDescriptor {
  generateTexture(): OutputTexture;
}

interface GeneratorOptions {}

interface Generator {
  readonly SeedType: NumberConstructor | BigIntConstructor;

  readonly label: string;
  readonly minResolution: number;
  readonly maxResolution: number;
  readonly maxSeedValue: number | bigint;

  readonly options: GeneratorOptions;

  createOutputTextureDescriptor(
    resolutionY: number,
    resolutionX: number,
    seed: number | bigint,
    gradient: WasmGradient,
    options: GeneratorOptions
  ): OutputTextureDescriptor;
}

export class KSINK implements Generator {
  public readonly SeedType = BigInt;

  public readonly label: string = "KSINK";
  public readonly minResolution: number = 1;
  public readonly maxResolution: number = 4294967295;
  public readonly maxSeedValue: bigint = BigInt("18446744073709551615");
  public readonly options: GeneratorOptions = {};

  public createOutputTextureDescriptor(
    resolutionY: number,
    resolutionX: number,
    seed: bigint,
    gradient: WasmGradient
  ) {
    return new KSINKOutputTextureDescriptor(
      resolutionY,
      resolutionX,
      seed,
      gradient
    );
  }
}

type PHashOffset = 0 | 8 | 16 | 24;

export class PHashOptions implements GeneratorOptions {
  public offsets: Record<PHashOffset, Dimension> = {
    0: Dimension.X,
    8: Dimension.Y,
    16: Dimension.Z,
    24: Dimension.T,
  };
}

export class PHash implements Generator {
  public readonly SeedType = Number;

  public readonly label: string = "PHash";
  public readonly minResolution: number = 1;
  public readonly maxResolution: number = 255;
  public readonly maxSeedValue: number = 255;
  public readonly options: PHashOptions = new PHashOptions();

  public createOutputTextureDescriptor(
    resolutionY: number,
    resolutionX: number,
    seed: number,
    gradient: WasmGradient,
    options: any
  ) {
    return new PHashOutputTextureDescriptor(
      resolutionY,
      resolutionX,
      seed,
      gradient,
      options.offsets[0],
      options.offsets[8],
      options.offsets[16],
      options.offsets[24]
    );
  }
}
