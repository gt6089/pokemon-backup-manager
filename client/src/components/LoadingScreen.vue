<template>
  <div>
    <h1>{{ text }}</h1>
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    text: String
  }
};
</script>

<style>
</style>
