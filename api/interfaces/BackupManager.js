const { Database } = require("../db");
const moment = require("moment");
const _ = require("lodash");

class BackupManager {
  constructor() {}

  async createBackup(cards) {
    try {
      this.cleanCollections();
      const timestamp = moment.utc().format();
      const collection = Database.db.collection(timestamp);
      const result = await collection.insertMany(cards);
      Database.lastBackupName = timestamp;
      return {
        insertedCount: result.insertedCount,
        insertedIds: result.insertedIds,
      };
    } catch (e) {
      throw e;
    }
  }

  async purgeBackup() {
    try {
      if (!Database.lastBackupName) {
        throw new Error("No backups to purge");
      }
      this.cleanCollections();
    } catch (e) {
      throw e;
    }
  }

  async searchBackup(params) {
    try {
      if (!Database.lastBackupName) {
        throw new Error("No backup exists");
      }

      const collection = Database.db.collection(Database.lastBackupName);
      const results = await collection.find({ ...params });
      const resultsArr = [];

      await results.forEach((result) => resultsArr.push(result));
      return resultsArr;
    } catch (e) {
      throw e;
    }
  }

  async cleanCollections() {
    try {
      const collections = await Database.db.listCollections();
      await collections.forEach((collection) => {
        Database.db.collection(collection.name).drop();
      });
      Database.lastBackupName = "";
    } catch (e) {
      throw e;
    }
  }
}

module.exports = BackupManager;
