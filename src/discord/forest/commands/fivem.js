const { MessageEmbed } = require("discord.js")

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'fivem')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify a server')

    message.channel.send('*FiveM Server Informations are sent in your DMs...*')

    needle.get(`https://servers-frontend.fivem.net/api/servers/single/${args[1]}`, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)
      if (r.statusCode == 404) return message.reply(`:x: The server does not exist\nExample(\`https://cfx.re/join/ggp54z\`): \`${prefix}fivem ggp54z\``)

          message.author.send({

            embeds:[{
              title: "FiveM",
              color: "RANDOM",
              fields: [
                {
                  name: 'Server name',
                  value: `\`\`\`${r.body.Data.hostname.replace(/\^/g, '')||"undefined"}\`\`\``,
                  inline: false
                },
                {
                  name: 'Map name',
                  value: r.body.Data.mapname ? r.body.Data.mapname : 'no map name found !',
                  inline: false
                },
                {
                  name: 'Online players',
                  value: `${r.body.Data.players.length||"undefined"}`,
                  inline: false
                },
                {
                  name: 'Max players',
                  value: `${r.body.Data.svMaxclients||"undefined"}`,
                  inline: false
                },
                {
                  name: 'server',
                  value: `${r.body.Data.server||"undefined"}`,
                  inline: false
                },
                {
                  name: 'Self reported clients',
                  value: `${r.body.Data.selfReportedClients||"undefined"}`,
                  inline: false
                },
                {
                  name: 'Owner infos',
                  value: `\`\`\`ID: ${r.body.Data.ownerID}\nname: ${r.body.Data.ownerName}\nprofile: ${r.body.Data.ownerProfile}\nlast seen: ${r.body.Data.lastSeen.replace(/T/, " ").replace(/\..+/, "")}\`\`\``,
                  inline: false
                },
                {
                  name: `${r.body.Data.connectEndPoints[0].startsWith('http') ? 'Url' : 'ip:port'}`,
                  value: `${r.body.Data.connectEndPoints[0].startsWith('http') ? r.body.Data.connectEndPoints[0] : r.body.Data.connectEndPoints.join(', ')}`,
                  inline: false
                },
                {
                  name: 'Infos.json',
                  value: `players: ${r.body.Data.connectEndPoints[0].startsWith('http') ? r.body.Data.connectEndPoints[0] : 'http://' + r.body.Data.connectEndPoints[0] + '/'}players.json\nInfos: ${r.body.Data.connectEndPoints[0].startsWith('http') ? r.body.Data.connectEndPoints[0] : 'http://' + r.body.Data.connectEndPoints[0] + '/'}info.json\ndynamic: ${r.body.Data.connectEndPoints[0].startsWith('http') ? r.body.Data.connectEndPoints[0] : 'http://' + r.body.Data.connectEndPoints[0] + '/'}dynamic.json`,
                  inline: false
                },
              ],
              thumbnail: {
                url: String(r.body.Data.ownerAvatar)
              }
    
            }]

          })

      text = new String()

      Object.keys(r.body.Data.vars).forEach(aa => {

        text += `${aa}: ${r.body.Data.vars[aa]}\n`

      })

      message.author.send('```env\n' + text + '```')

    })

  }

}
