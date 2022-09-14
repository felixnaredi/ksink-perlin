import {
  KSINKOutputTextureDescriptor,
  PHashOutputTextureDescriptor,
  OutputTexture,
} from "../../dist/wasm";

interface OutputTextureDescriptor {
  generateTexture(): OutputTexture;
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

export class KSINK implements Generator {
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

export class PHash implements Generator {
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
