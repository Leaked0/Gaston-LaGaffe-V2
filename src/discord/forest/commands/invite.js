const { MessageEmbed } = require('discord.js');

module.exports = function(message, client, prefix, needle) {

  if (message.content == `${prefix}invite`) {
    
    return message.reply({content: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=-1&scope=applications.commands%20bot`})
  }
  
}
