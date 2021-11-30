let staff = require('../../../../staff.json');
const mute = require('./mute');

module.exports = async function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'setupMute')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply({content: "You are not allowed to use this command !"})
    }

    let muteRole = message.guild.roles.cache.find(x => x.name === "Muted");
    if(!muteRole){
      muteRole = await message.guild.roles.create({ name: 'Muted', color: 0x36393f, reason: 'Created "Muted" Role' });
    }
    message.guild.channels.cache.forEach(async (channel, id) => {
      channel.permissionOverwrites.create(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        READ_MESSAGE_HISTORY: true
      });
    });
    message.reply({content: `Finished.`});
  }
}
