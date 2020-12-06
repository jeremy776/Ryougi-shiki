import { MessageEmbed, Message } from "discord.js";

export default (client, message: Message, query: string, tracks) => {
    const embed = new MessageEmbed()
    .setAuthor(`Search ${query}!`)
    .setColor(client.color)
    .setDescription(tracks.slice(0, 5).map((t, i) => `${i+1}. ${t.title}`))
    .setFooter('Please select number 1 through number 5!')
    message.channel.send(embed);
}
