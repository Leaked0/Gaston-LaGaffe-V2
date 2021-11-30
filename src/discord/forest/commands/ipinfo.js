const { MessageEmbed } = require('discord.js');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'ipinfo')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify an ip')

    needle.get(`https://api.c99.nl/geoip?key=${process.env.C99_API_KEY}&host=${args[1]}&json`, {
    }, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)
      if (r.body.error) return message.reply(':x: Unable to verify ' + args[1])

      message.channel.send('*IP Informations sent in your DMs...*');
      const embed = new MessageEmbed();
      embed.setDescription(`\`\`\`json\n${JSON.stringify(r.body, null, 4)}\`\`\``);
      message.author.send({embeds: [embed]}).catch(() => {
        message.reply("error try again later");
      });

    })

    /*
    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify an ip')

    needle.get(`https://api.ipgeolocation.io/ipgeo?apiKey=2bcdcb179e8a43759c03cd4bb10ff1ec&ip=${args[1]}`, {
      headers: {
        'accept': 'application/json'
      }
    }, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)
      if (r.body.error) return message.reply(':x: Unable to verify ' + args[1])

      message.channel.send('*IP Informations sent in your DMs...*');
      const embed = new MessageEmbed();
      embed.setDescription(`\`\`\`json\n${JSON.stringify(r.body, null, 4)}\`\`\``);
      message.author.send({embeds: [embed]}).catch(() => {
        message.reply("error try again later");
      });

    })
    */

  }

}
