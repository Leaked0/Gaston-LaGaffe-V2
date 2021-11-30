let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'unmute')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply({content: "You are not allowed to use this command !"})
    }

    args = message.content.slice(1).split(' ');

    if (args[0] == undefined || args[0] == '') {
      return message.reply({content: 'Specify a User ID or ping someone'})
    }

    if(message.mentions.users.size < 1){
      return message.reply({content: "Ping someone or give a valid User ID"});
    }
    let user = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[1]);
    if(!user) return message.reply({content: "Ping someone or give a valid User ID"});

    if(user.id == message.author.id) {
      return message.reply({content: "Are you scyzophrenic !? You can't unmute yourself.."})
    } else if (user.id == client.user.id) {
      return message.reply({content: "Are you Autistic !? I can't unmute myself.."})
    } else if (!user.manageable) {
      return message.reply({content: "I can't unmute this user, he's prolly above me/you"})
    }
    let muteRole = message.guild.roles.cache.find(x => x.name === "Muted");
    user.roles.remove(muteRole).catch(console.error);
    message.reply({content: `<@${message.author.id}> just unmuted \`${user.user.tag}\` - (\`${user.id}\`)`});
  }
}
