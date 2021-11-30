const { MessageEmbed } = require("discord.js")

module.exports = function (message, client, prefix, needle) {
  
  if (message.content.startsWith(prefix + 'dns')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify a host')

    needle.get(`https://check-host.net/check-dns?host=${args[1]}`, {
      headers: {
        'accept': 'application/json'
      }
    }, (e, r) => {

      if (e) return message.reply({content: ':x: Unable to verify ' + args[1]}), console.error(err)
      if (r.body.error) return message.reply({content: ':x: Unable to verify ' + args[1]})

      message.channel.send({content: '*DNS Sent in your DMs...*'})

      setTimeout(() => {


        needle.get(`https://check-host.net/check-result/${String(r.body.request_id)}`, (err, res) => {

          if (err) return message.reply({content: ':x: Unable to verify ' + args[1]}), console.error(err)

          let arr = new Array

          aa = Object.values(res.body)

          aa.forEach(d => {

            if (!d) return;

            d.forEach(aa => {

              arr.push({

                ipv4: aa.A.join(', '),
                ipv6: aa.AAAA.join(', '),
                ttl: aa.TTL

              })

            })

          })

          a = Object.values(r.body.nodes)
          text = new String()

          let ii = 0

          while (ii < arr.length) {

            text += `**Location:** ${a[ii][2]}\n**Flag:** :flag_${a[ii][0]}:\n**TTL:** ${arr[ii].ttl}\n**Result ( ipv4 ):** \`\`\`${arr[ii].ipv4}\`\`\`${ (arr[ii].ipv6).toString() ? '\n**Result ( ipv6 ):**```' + arr[ii].ipv6 + '```' : ''}\n\n`
            ii++

          }

          const embed = new MessageEmbed();
          embed.setTitle(`:white_check_mark: DNS check`)
          embed.setDescription(text)
          embed.setColor("RANDOM")

          return message.author.send({

            embeds:[embed]

          })

        })
      }, 1000)

    })

  }

}
