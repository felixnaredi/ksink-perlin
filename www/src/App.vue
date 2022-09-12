<template>
  <div class="flex justify-between h-screen items-start">
    <div class="p-6 w-full h-full">
      <output-table class="w-full h-full" />
    </div>
    <config-side-panel class="w-64 h-full" />
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
