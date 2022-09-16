import { Color, WasmGradient } from "../../dist/wasm";

export function parseHexColor(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return new Color(r, g, b, 255);
}

export class Gradient {
  private inner: WasmGradient;

  constructor() {
    this.inner = new WasmGradient(
      new Color(0x08, 0x08, 0x08, 0xff),
      new Color(0xef, 0xfd, 0xef, 0xff),
      16
    );
  }

  public get color0() {
    return this.inner.getColor0();
  }

  public set color0(color: Color) {
    this.inner.setColor0(color);
  }

  public get color1() {
    return this.inner.getColor1();
  }

  public set color1(color: Color) {
    this.inner.setColor1(color);
  }

  public get steps() {
    return this.inner.getSteps();
  }

  public set steps(amount: number) {
    this.inner.setSteps(amount);
  }
}
