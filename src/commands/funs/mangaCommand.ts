import { MessageEmbed } from "discord.js";
const request = require("node-superfetch");

export default {
  name: "manga",
  description: "get info about manga",
  cooldown: 1,
  guildOnly:true,
  execute(message, args, client) {

  function shorten(text, maxLen = 2000) {
            return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
        }
        const query = args.join(' ');

        try{
          const { text } = await request.get('https://kitsu.io/api/edge/manga').query({ 'filter[text]': query });
	  const body = JSON.parse(text);
	  if (!body.data.length) return message.reply('Could not find any results.');
		const data = body.data[0].attributes;
                const test = data.slug;
                const test1 = test.toUpperCase();
          
	const embed = new Discord.MessageEmbed()
	.setColor(client.color)
	.setAuthor(`${test1}`, 'https://i.imgur.com/lVqooyd.png', 'https://kitsu.io/explore/manga')
	.setURL(`https://kitsu.io/manga/${data.slug}`)
        .setThumbnail(data.posterImage ? data.posterImage.original : null)
	.setTitle(data.canonicalTitle)
	.setDescription(shorten(data.synopsis))
	.addField('❯ Type', `${data.subtype} - ${data.status}`, true)
	.addField('❯ Volumes / Chapters', `${data.volumeCount || '???'} / ${data.chapterCount || '???'}`, true)
	.addField('❯ Date starts', data.startDate ? new Date(data.startDate).toDateString() : '???', true)
	.addField('❯ Date end', data.endDate ? new Date(data.endDate).toDateString() : '???', true);
	return message.channel.send(embed);
     } catch (err) {
	return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
     }
 }
}
