const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const { MongoClient } = require("mongodb");
const mongoUri = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.p7hot.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

class Database {
  static async run() {
    if (this.db) {
      return this.db;
    }

    const client = new MongoClient(this.uri, this.options);
    await client.connect();
    this.db = client.db("rewind");
    console.log("Succesfully connected to MongoDB server");
    this.fetchLastBackupName();
    return this.db;
  }

  static async fetchLastBackupName() {
    try {
      const collections = await this.db.listCollections().toArray();

      if (collections.length == 0) {
        return;
      }
      // assumes only ever 1 collection
      this.lastBackupName = collections[0].name;
      console.log("Setting last backup name:", this.lastBackupName);
    } catch (e) {
      console.error(e);
    }
  }
}

Database.db = null;
Database.uri = mongoUri;
Database.options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
Database.lastBackupName = "";

module.exports = { Database };
