const { MessageEmbed } = require('discord.js');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'sd')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify an host')

    needle.get(`https://api.c99.nl/subdomainfinder?key=${process.env.C99_API_KEY}&domain=${args[1]}&json`, {
    }, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)
      if (r.body.error) return message.reply(':x: Unable to verify ' + args[1])

      message.channel.send('*Subdomains Informations sent in your DMs...*');
      const embed = new MessageEmbed();
      embed.setDescription(`\`\`\`\n${Object.keys(r.body.subdomains).length} subdomains for the domain ${args[1]}\`\`\``);
      message.author.send({embeds: [embed]}).catch(() => {
        message.reply("error try again later");
      });
    })
  }

}
