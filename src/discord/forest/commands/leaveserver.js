let staff = require('../../../../staff.json');
const { MessageEmbed } = require("discord.js")

module.exports = async function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'leaveserver')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"] || staff[message.author.id]["type"] != "admin"){
      return message.reply({content: "You are not allowed to use this command !"})
    }

    args = message.content.slice(1).split(' ');

    if(!args[1]) return message.reply("Specify a Discord Server ID");
    let guild = client.guilds.cache.get(args[1]);
    if(!guild) return message.reply("This Guild doesn't exist.");
    await message.reply(`Left \`${guild.name}\` with success !`) && guild.leave();
  }
}
