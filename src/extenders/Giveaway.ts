const { GiveawaysManager } = require('discord-giveaways');

class Giveaway extends GiveawaysManager {

  async getAllGiveaways() {
    return await this.client.db.get("giveaways");
  }

  async editGiveaways(id, data) {
    let giveaway = await this.client.db.get("giveaways");
    let newData = giveaway.filter((g) => g.messageID !== id);
    newData.push(data);
    await this.client.db.set("giveaways", newData);
    return true;
  }

  async saveGiveaway(id, data) {
    await this.client.db.push("giveaways", data);
    return true;
  }

  async deleteGiveaway(id) {
    let data = await this.client.db.get("giveaways")
    let newData = data.filter((d) => d.messageID !== id)
    await this.client.db.set("giveaways", newData);
    return true;
  }

}
