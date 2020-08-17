const { Database } = require("../db");
const moment = require("moment");
const _ = require("lodash");

class BackupManager {
  constructor() {}

  async createBackup(cards) {
    try {
      await this.cleanCollections();

      const timestamp = moment.utc().format();
      const collection = Database.db.collection(timestamp);
      const result = await collection.insertMany(cards);
      Database.lastBackupName = timestamp;

      console.log("result of inserting", result);
      console.log(`${result.insertedCount} documents inserted`);

      return {
        insertedCount: result.insertedCount,
      };
    } catch (e) {
      throw e;
    }
  }

  async purgeBackup() {
    try {
      if (!Database.lastBackupName) {
        throw new Error("No backup found. Purge not completed.");
      }
      this.cleanCollections();
    } catch (e) {
      throw e;
    }
  }

  async searchBackup(params) {
    try {
      if (!Database.lastBackupName) {
        throw new Error("No backup found.");
      }

      const collection = Database.db.collection(Database.lastBackupName);

      const cleanedParams = this.cleanParams(params);
      const results = await collection.find(cleanedParams);
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
      await collections.forEach(async (collection) => {
        await Database.db.collection(collection.name).drop();
      });
      Database.lastBackupName = "";
    } catch (e) {
      throw e;
    }
  }

  cleanParams(params) {
    const searchObj = {};
    if (params.name) {
      searchObj.name = params.name;
    }
    if (params.hp) {
      searchObj.hp = params.hp;
    }
    if (params.rarity) {
      searchObj.rarity = params.rarity;
    }
    return searchObj;
  }
}

module.exports = BackupManager;
