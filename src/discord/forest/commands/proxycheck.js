const { MessageEmbed } = require('discord.js');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'proxycheck')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify an ip')

    needle.get(`https://api.c99.nl/proxydetector?key=${process.env.C99_API_KEY}&ip=${args[1]}`, {
    }, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)
      if (r.body.error) return message.reply(':x: Unable to verify ' + args[1])

      message.channel.send('*Proxy result sent in your DMs...*');
      const embed = new MessageEmbed();
      embed.setDescription(`\`\`\`\n${r.body}\`\`\``);
      message.author.send({embeds: [embed]}).catch(() => {
        message.reply("error try again later");
      });
    })
  }

}
