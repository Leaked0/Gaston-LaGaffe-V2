module.exports = client => {

    create = (a, b) => {

        let c = client.api.applications(client.user.id)
  
        if (a) c.guilds(a)
  
        if (b) c.commands.post({
          data: b
        })
  
      },
  
      remove = async (b) => {
        await client.api.applications(client.user.id).commands(b).delete()
      }
  
      reply = (i, b, t) => {
        if (!i && !b) return
  
        if(typeof b !== 'object' && typeof b !== 'string') throw new Error(`Invalid Value ${typeof b}!`)
  
        if (typeof b == 'string') {
  
          client.api.interactions(i.id, i.token).callback.post({
            data: {
              type: Number(t),
              data: {
                content: b
              }
            }
          })
  
        } else if (typeof b == 'object') {
  
          client.api.interactions(i.id, i.token).callback.post({
            data: {
              type: Number(t),
              data: {
                embeds: [b]
              }
            }
          })
  
        } else throw new Error(`Invalid Value ${b}!`)
  
      }

      module.exports = {
          create,
          remove,
          reply
      }

}