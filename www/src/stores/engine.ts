import { defineStore } from "pinia";

export const useEngineStore = defineStore("engine", {
  actions: {
    ksink: async (x: bigint, c: bigint) => {
      return import("../../dist/wasm").then((wasm) => wasm.ksink(x, c));
    },
  },
});
