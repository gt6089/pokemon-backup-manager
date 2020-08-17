const express = require("express");
const bodyParser = require("body-parser");

const { Database } = require("./db");

const app = express();
const port = 3000;

const backupRoutes = require("./routes/backupRoutes");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(backupRoutes);

app.use((req, res, next) => {
  res.sendStatus(403);
});

app.listen(port, () => {
  console.log(`Pokemon Backup Manager listening on port ${port}`);
  Database.run();
});

module.exports = app;
