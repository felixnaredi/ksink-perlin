<template>
  <h1>KSINK + Perlin = ❤️</h1>
  <table>
    <tr>
      <td>
        <span class="monospace delim">x</span>
      </td>
      <td>
        <input v-model="x" @input="updateOut" class="monospace" />
      </td>
    </tr>
    <tr>
      <td>
        <span class="monospace delim">c</span>
      </td>
      <td>
        <input v-model="c" @input="updateOut" class="monospace" />
      </td>
    </tr>
    <tr>
      <td>
        <div class="mt-1em">
          <span class="monospace">out =></span>
        </div>
      </td>
      <td>
        <div class="mt-1em">
          <span class="monospace bold">{{ out }}</span>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      x: BigInt(0),
      c: BigInt(0),
      out: null,
    };
  },
  methods: {
    incrementCount() {
      this.count += 1;
    },
    updateOut() {
      import("../../pkg").then(
        (wasm) => (this.out = wasm.ksink(BigInt(this.x), BigInt(this.c)))
      );
    },
  },
  created() {
    this.updateOut();
  },
};
</script>

<style scoped>
.monospace {
  font-family: monospace;
}
.bold {
  font-weight: bold;
}
.delim::after {
  content: " : ";
}
.mt-1em {
  margin-top: 1em;
}
</style>