const express = require("express");
const router = express.Router();

const pokemonApi = require("../api/pokemon");

const BackupManager = require("../interfaces/BackupManager");

const manager = new BackupManager();

router.get("/create", async (req, res) => {
  try {
    const response = await pokemonApi.get("/cards?setCode=base4");
    const backup = await manager.createBackup(response.data.cards);
    res.status(201).send(backup);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/purge", async (req, res) => {
  try {
    const response = await manager.purgeBackup();
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/search", async (req, res) => {
  try {
    const response = await manager.searchBackup(req.body);
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
