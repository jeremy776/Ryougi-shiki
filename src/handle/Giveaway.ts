const { GiveawaysManager } = require('discord-giveaways');

export default class Giveaway extends GiveawaysManager {
  /**
   * @param {Discord.Client} client The Discord Client
   * @param {GiveawaysManagerOptions} options The manager options
   */
   constructor(client, options, init = true) {
     super();
     if (!client) throw new Error('Client is a required option.');
     /*
       The Discord Client
       @type {Discord.Client}
      /
      this.client = client;
      /
        Whether the manager is ready
       @type {Boolean}
       /
      this.ready = false;
      /
       The giveaways managed by this manager
        @type {Giveaway[]}
       
      this.giveaways = [];
      *
       The manager options
       * @type {GiveawaysManagerOptions}
       
      this.options = merge(defaultManagerOptions, options);
      if (init) this._init();/*
   }


  async getAllGiveaways() {
    return await this.client.db.get("giveaways");
  }

  async editGiveaway(id:number, data:any) {
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
