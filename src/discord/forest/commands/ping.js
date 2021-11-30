module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'ping')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply(':x: please specify a host')

    needle.get(`https://check-host.net/check-ping?host=${args[1]}`, {
      headers: {
        'accept': 'application/json'
      }
    }, (e, r) => {

      if (e) return message.reply(':x: Unable to verify ' + args[1]), console.error(e)
      if (r.body.error) return message.reply(':x: Unable to verify ' + args[1])

      message.channel.send('*PING Informations sent in your DMs...*')

      setTimeout(() => {


        needle.get(`https://check-host.net/check-result/${String(r.body.request_id)}`, (err, res) => {

          if (err) return message.reply(':x: Unable to verify ' + args[1]), console.error(err)

          let arr = new Array

          aa = Object.values(res.body)

          aa.forEach(d => {

            if (!d) return;

            let i = 0,
              b = new String(),
              c = new String()

            d.forEach(aa => {

              aa.forEach(aaa => {
                if (aaa[0] == 'OK') i++
              })
              b = String(aa[0][1] * 1000).split('.')[0]
              c = String(aa[0][2])

            })

            arr.push({

              i: i + '/4',
              ms: b + 'ms',
              ip: c
              
            })

          })

          a = Object.values(r.body.nodes)
          text = new String()

          let ii = 0

          while(ii < arr.length) {

            text += `IP adress: \`\`\`${arr[ii].ip}\`\`\`\nLocation: ${a[ii][2]}\nFlag: :flag_${a[ii][0]}:\nResult: ${arr[ii].i}\nms: ${arr[ii].ms}\n\n`
            ii++

          }

          return message.author.send({

            embeds:[{
              title: `:white_check_mark: Ping check`,
              description: text == "" || text == null ? "Down" : text,
              color: "RANDOM"
            }]
    
          })

        })
      }, 2000)

    })

  }

}
