<template>
  <div>
    <b-form class="search-fields" @submit="submit" @reset="clearForm">
      <b-form-group label="Name" label-for="name-input">
        <b-form-input id="name-input" v-model="form.name" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="Hitpoints (HP)" label-for="hp-input">
        <b-form-input id="hp-input" v-model="form.hp" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="Rarity" label-for="rarity-select">
        <b-form-select id="rarity-select" v-model="form.rarity" :options="rarities"></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary" :click="submit">Search</b-button>
      <b-button type="reset" variant="danger" :click="clearForm">Clear Form</b-button>
    </b-form>
    <div class="results">
      <b-spinner v-if="isLoading"></b-spinner>
      <b-alert show v-else-if="errorMessage" variant="danger">{{ errorMessage }}</b-alert>
      <div v-else>
        <b-alert show variant="success">{{ results.length }} cards found</b-alert>
        <div class="card-grid d-flex flex-row flex-wrap justify-content-around">
          <b-card no-body class="overflow-hidden" v-for="card in results" :key="card._id">
            <b-card-img :src="card.imageUrl" :alt="card.name" class="rounded-0"></b-card-img>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import api from "../api";

export default {
  name: "SearchScreen",
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      form: {
        name: "",
        hp: "",
        rarity: "",
      },
      rarities: ["Common", "Uncommon", "Rare"],
      results: [],
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      this.isLoading = true;
      this.errorMessage = "";
      this.results = [];

      try {
        const response = await api.post("/search", {
          name: this.form.name,
          hp: this.form.hp,
          rarity: this.form.rarity,
        });

        this.results = response.data;
        this.isLoading = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.isLoading = false;
      }
    },
    clearForm(e) {
      e.preventDefault();
      this.form = {
        name: "",
        hp: "",
        rarity: "",
      };
      this.errorMessage = "";
    },
  },
};
</script>

<style>
.search-fields {
  border: 1px solid gray;
  padding: 20px;
}
</style>
