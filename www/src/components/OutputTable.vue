<template>
  <table>
    <tr v-for="y in ys" :key="y">
      <td v-for="x in xs" :key="x">
        <span class="monospace">{{ table[y][x] }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { useEngineStore } from "../stores/engine";

export default {
  data: () => ({
    engine: useEngineStore(),
    table: [],
  }),
  methods: {
    range: (n) => {
      return Array(n)
        .fill(0)
        .map((_, i) => i);
    },
    updateTable() {
      this.engine
        .fill()
        .then(
          (table) =>
            (this.table = table.map((row) =>
              row.map((value) => (value % 256n).toString(16).padStart(2, "0"))
            ))
        );
    },
  },
  computed: {
    ys() {
      return this.range(this.table.length);
    },
    xs() {
      return this.range(this.table[0].length);
    },
  },
  created() {
    this.updateTable();
    this.engine.$subscribe(() => this.updateTable());
  },
};
</script>