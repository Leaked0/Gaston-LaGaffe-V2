module.exports = (glob, path, client, needle) => {

  const prefix = process.env.PREFIX

  client.on('ready', async () => {

    console.log("DiscordJs Bot Instance is Ready")
    
    setInterval(()=> {
      client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
    }, 900000)

    /*glob('./src/discord/forest/commands/slash/*.js', (e, files) => {
      if (e) console.error(e)
      for (var i = 0; i < files.length; i++) {
        require(path.resolve(files[i]))(client, prefix, needle, create, reply)
      }
    })*/

    //console.log(await client.api.applications(client.user.id).commands.get())

  })

  client.on('messageCreate', async (message) => {

    console.log(`[${message.author.id}]: ${message.content}`)

    glob('./src/discord/forest/commands/*.js', (e, files) => {
      if (e) console.error(e)

      for (var i = 0; i < files.length; i++) {
        require(path.resolve(files[i]))(message, client, prefix, needle)
      }

    })

  })


  client.login(process.env.DiscordToken)
}
