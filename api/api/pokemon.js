const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.pokemontcg.io/v1",
});

module.exports = instance;
