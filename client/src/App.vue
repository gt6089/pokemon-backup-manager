<template>
  <div id="app">
    <b-container>
      <Navbar
        @create-backup="requestCreate"
        @purge-backup="requestPurge"
        @search-backup="requestSearch"
      />
      <div v-if="showLoading">
        <LoadingScreen :text="loadingText" />
      </div>
      <div v-if="!showLoading">
        <div v-if="showConfirm">
          <ConfirmScreen
            :confirm-text="confirmText"
            @confirm-yes="purgeBackup"
            @confirm-no="cancelPurge"
          />
        </div>
        <div v-else-if="showSearch">
          <SearchScreen />
        </div>
        <div v-else-if="errorMessage">
          <b-alert show variant="danger">{{ errorMessage }}</b-alert>
        </div>
        <div v-else>
          <h2>{{ displayText }}</h2>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import ConfirmScreen from "./components/ConfirmScreen.vue";
import SearchScreen from "./components/SearchScreen.vue";

import api from "./api";

export default {
  name: "App",
  components: {
    Navbar,
    LoadingScreen,
    ConfirmScreen,
    SearchScreen,
  },
  data() {
    return {
      showLoading: false,
      showConfirm: false,
      showSearch: false,
      loadingText: "",
      confirmText: "",
      displayText: "",
      errorMessage: "",
    };
  },
  methods: {
    async requestCreate() {
      this.showSearch = false;
      this.showConfirm = false;
      this.displayText = "";
      this.errorMessage = "";
      this.loadingText = "Creating backup...";
      this.showLoading = true;
      try {
        await api.get("/create");

        this.displayText = "Backup successfully created.";
        this.showLoading = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.showLoading = false;
      }
    },
    async requestPurge() {
      this.showSearch = false;
      this.showConfirm = false;
      this.displayText = "";
      this.errorMessage = "";
      this.confirmText = "Are you sure you want to purge your backup?";
      this.showConfirm = true;
    },
    async purgeBackup() {
      try {
        this.showSearch = false;
        this.showConfirm = false;
        this.loadingText = "Purging backup...";
        this.showLoading = true;

        await api.get("/purge");

        this.displayText = "Backup successfully purged.";
        this.showLoading = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.showLoading = false;
      }
    },
    requestSearch() {
      this.displayText = "";
      this.errorMessage = "";
      this.showConfirm = false;
      this.showSearch = true;
    },
    cancelPurge() {
      this.showConfirm = false;
    },
  },
};
</script>

<style>
</style>
