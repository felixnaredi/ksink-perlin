<template>
  <div class="justify-between">
    <div>
      <h1>KSINK + Perlin = ❤️</h1>
      <output-table></output-table>
    </div>
    <config-side-panel></config-side-panel>
  </div>
</template>

<script>
import ConfigSidePanel from "./components/ConfigSidePanel.vue";
import OutputTable from "./components/OutputTable.vue";
import { useEngineStore } from "./stores/engine";

export default {
  components: { OutputTable, ConfigSidePanel },
  data() {
    return {
      height: 5,
      width: 8,
      table: null,
    };
  },
  methods: {
    updateTable() {
      useEngineStore()
        .fill()
        .then((table) => {
          this.table = table.map((row) =>
            row.map((value) => (value % 256n).toString(16))
          );
        });
    },
  },
  created() {
    useEngineStore().seed = BigInt(2);
    this.updateTable();
  },
};
</script>

<style>
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
.justify-between {
  display: flex;
  justify-content: space-between;
}
.bg-lightgrey {
  background-color: lightgray;
}
.p-025em {
  padding: 0.25em;
}
.p-05em {
  padding: 0.5em;
}
</style>