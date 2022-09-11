<template>
  <div class="flex justify-between">
    <div class="pl-6">
      <h1 class="text-xl py-6">KSINK + Perlin = ❤️</h1>
      <output-table />
    </div>
    <config-side-panel class="w-64" />
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
