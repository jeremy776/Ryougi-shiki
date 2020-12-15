import Listener from "../handle/Listener";

export default class GuildMemberAdd extends Listener {
  public name = "guildMemberAdd";
  public async exec(member: any) {

  let data = await this.client.db.get(`autorole.${member.guild?.id}`)
  if(!data) return;
  if(data.status == false) return;
  if(data.status == true) {
    let role = member.guild?.roles.cache.get(data.id)
    member.roles.add(role)
  }

 }
}
