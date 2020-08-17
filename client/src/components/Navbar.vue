<template>
  <div>
    <div class="row d-flex justify-content-between">
      <h2>Pokemon Card Manager</h2>
      <div class="action-bar">
        <b-button @click="createBackup">Create Backup</b-button>
        <b-button @click="purgeBackup">Purge Backup</b-button>
        <b-button @click="searchBackup">Search Backup</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {}
  },
  methods: {
    createBackup() {
      this.$emit("create-backup");
    },
    purgeBackup() {
      this.$emit("purge-backup");
    },
    searchBackup() {
      this.$emit("search-backup");
    }
  },
};
</script>

<style scoped>
.action-bar > * {
  margin: 0 12px;
}
</style>
