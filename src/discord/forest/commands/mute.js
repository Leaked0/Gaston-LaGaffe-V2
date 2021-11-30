let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'mute')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply({content: "You are not allowed to use this command !"})
    }

    args = message.content.slice(1).split(' ');

    if (args[1] == undefined || args[1] == '') {
      return message.reply({content: 'Specify a User ID or ping someone'})
    }

    let user = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[1]);
    if(!user) return message.reply({content: "Ping someone or give a valid User ID"});

    if (!args[2]) return message.reply({content: ':x: please specify a reason'})
    let reason = message.content.split(' ').slice(2).join(' ');

    if(user.id == message.author.id) {
      return message.reply({content: "Are you scyzophrenic !? You can't mute yourself.."})
    } else if (user.id == client.user.id) {
      return message.reply({content: "Are you Autistic !? I can't mute myself.."})
    } else if (!user.manageable) {
      return message.reply({content: "I can't mute this user, he's prolly above me/you"})
    }
    //let muteRole = message.guild.roles.cache.find(r => r.id == process.env.MUTE_ROLE);
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    if(!muteRole) return message.reply({content: `\`Muted\` role not found !`, allowedMentions: { repliedUser: true }});
    user.roles.add(muteRole).catch(console.error);
    //message.guild.members.cache.get(user.id).edit({data: {}, reason: `Muted By ${message.author.tag} for: ${reason}`});
    message.reply({content: `<@${message.author.id}> just muted \`${user.user.tag}\` - (\`${user.id}\`) for the reason \`${reason}\``});
  }
}
