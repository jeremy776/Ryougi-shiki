const { GiveawaysManager } = require('discord-giveaways');

export class Giveaway extends GiveawaysManager {

  async getAllGiveaways() {
    return await this.client.db.get("giveaways");
  }

  async editGiveaways(id:number, data:any) {
    let giveaway = await this.client.db.get("giveaways");
    let newData = giveaway.filter((g:any) => g.messageID !== id);
    newData.push(data);
    await this.client.db.set("giveaways", newData);
    return true;
  }

  async saveGiveaway(id:number, data:any) {
    await this.client.db.push("giveaways", data);
    return true;
  }

  async deleteGiveaway(id:number) {
    let data = await this.client.db.get("giveaways")
    let newData = data.filter((d:any) => d.messageID !== id)
    await this.client.db.set("giveaways", newData);
    return true;
  }

}
