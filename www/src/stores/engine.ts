import { defineStore } from "pinia";

export const useEngineStore = defineStore("engine", {
  state: () => ({
    seed: BigInt(0),
    height: Number(5),
    width: Number(11),
  }),
  actions: {
    async fill() {
      return import("../../dist/wasm").then((wasm) =>
        Array(this.height)
          .fill(0)
          .map((_, y) =>
            Array(this.width)
              .fill(0)
              .map((_, x) =>
                wasm.ksink((BigInt(y) << BigInt(32)) | BigInt(x), this.seed)
              )
          )
      );
    },
  },
});
