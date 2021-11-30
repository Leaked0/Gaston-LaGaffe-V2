module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'udp')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify a host')

    needle.get(`https://check-host.net/check-udp?host=${args[1]}`, {
      headers: {
        'accept': 'application/json'
      }
    }, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)
      if (r.body.error) return message.reply(':x: Unable to verify ' + args[1])

      message.channel.send('*UDP Informations sent in your DMs...*')

      setTimeout(() => {


        needle.get(`https://check-host.net/check-result/${String(r.body.request_id)}`, (err, res) => {

          if (err) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)

          let arr = new Array

          aa = Object.values(res.body)

          aa.forEach(d => {

            if (!d) return;

            d.forEach(aa => {

              arr.push({

                ip: aa.address,
                time: aa.time
  
              })

            })

          })

          a = Object.values(r.body.nodes)
          text = new String()

          let ii = 0

          while(ii < arr.length) {

            text += `IP adress: \`\`\`${arr[ii].ip}\`\`\`\nLocation: ${a[ii][2]}\nFlag: :flag_${a[ii][0]}:\nTime: ${arr[ii].time||"0 ms"}\n\n\n`
            ii++

          }
    
          return message.author.send({

            embed: {
              title: `:white_check_mark: UDP connection check`,
              description: text,
              color: "RANDOM"
            }
    
          })

        })
      }, 6000)

    })

  }

}
