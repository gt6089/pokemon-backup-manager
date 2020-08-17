<template>
  <div class="text-center">
    <h1>{{ confirmText }}</h1>
    <b-button class="button" variant="primary" size="lg" @click="confirmYes">Yes</b-button>
    <b-button class="button" variant="danger" size="lg" @click="confirmNo">No</b-button>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    confirmText: String,
  },
  methods: {
    confirmYes() {
      this.$emit("confirm-yes");
    },
    confirmNo() {
      this.$emit("confirm-no");
    },
  },
};
</script>

<style>
.button {
  margin: 0 20px;
}
</style>
