let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'kick')) {
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
      return message.reply("Are you scyzophrenic !? You can't kick yourself..")
    } else if (user.id == client.user.id) {
      return message.reply("Are you Autistic !? I can't kick myself..")
    } else if (!user.kickable) {
      return message.reply("I can't kick this user, he's prolly above me/you")
    }
    message.guild.members.cache.get(user.id).kick({reason: `Kicked By ${message.author.tag} for: ${reason}`});
    message.reply(`<@${message.author.id}> just kick \`${user.user.tag}\` - (\`${user.id}\`) for the reason \`${reason}\``);
  }
}
