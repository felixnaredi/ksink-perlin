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

export default {
  components: { OutputTable, ConfigSidePanel },
  data: () => ({}),
};
</script>
