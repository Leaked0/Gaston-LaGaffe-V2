let staff = require('../../../../staff.json');
const { MessageEmbed } = require("discord.js")

module.exports = async function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'softban')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply("You are not allowed to use this command !")
    }

    args = message.content.slice(1).split(' ');

    if (args[1] == undefined || args[1] == '') {
      return message.reply('Specify a User ID or ping someone')
    }

    let user = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[1]);
    if(!user) return message.reply("Ping someone or give a valid User ID");

    if (!args[2]) return message.reply(':x: please specify a reason')
    let reason = message.content.split(' ').slice(2).join(' ');

    if(user.id == message.author.id) {
      return message.reply("Are you scyzophrenic !? You can't softban yourself..")
    } else if (user.id == client.user.id) {
      return message.reply("Are you Autistic !? I can't softban myself..")
    } else if (!user.bannable) {
      return message.reply("I can't softban this user, he's prolly above me/you")
    }
    message.channel.createInvite().then(async r => {
			let embed = new MessageEmbed()
			.setColor(0x920b0b)
			.addField(`${user.user ? user.user.tag : user.tag} a softban has been issued against you.`,`\n\n**Server**: [__**${message.guild.name}**__](https://discord.gg/${r.code})\n**Moderator**: __**${message.author.tag}**__\n**Reason**: __**${reason}**__\n\nClick on the guild name to get back.\n<t:${Math.round(Date.now()/1000)}:R>`)

			await user.send({ embeds: [embed] }) && message.guild.members.cache.get(user.id).ban({ days: 7, reason: `Soft Banned By ${message.author.tag} for: ${reason}` }) && message.guild.members.unban(user.user ? user.user.id : user.id, `Soft Banned By ${message.author.tag} for: ${reason}`) && message.reply(`Thanks <@${message.author.id}> you just softbanned \`${user.user ? user.user.tag : user.tag}\` for the reason \`${reason}\``);
		})

  }
}
