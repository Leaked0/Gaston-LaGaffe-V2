const { MessageEmbed } = require('discord.js');

module.exports = function(message, client, prefix, needle) {

  if (message.content.startsWith(`${prefix}help`)) {
    
    args = message.content.slice(1).split(' ')

    if(!args[1]) return message.reply("\n:flag_us: Specify `EN` or `FR`\n:flag_fr:Specifie `EN` ou `FR`");
    const embed = new MessageEmbed();
    if(args[1] == "FR"){
      embed.setTitle(`:flag_fr:`);
      embed.setDescription("__**`Fondateur:`**__ <@793813273098715146>\n__**`Co-Fondateur/Developpeur:`**__ <@868150205852291183>\nCommands Args:\nObligatoire: `<>` | Optionnel: `[]` | Séparé par `|` veut dire que plusieurs type d'arguments sont utilisable");
      embed.addField("__**Admin**__", "`methods`, `api`\n`clients` - `<add|remove> <Abonnement> <Ping|User ID>`\n`staff` - `<modo|admin|punch> <add|remove> <Ping|User ID>`\n`sub` - `<add|remove> <name> <conccurents> <secondes>`");
      embed.addField("__**Modération**__", "`setupMute`, `say`, `clear`, `nuke`, `mute`, `unmute`, `kick`, `ban`, `unban`, `softban`, `serverlist`, `leaveserver`");
      embed.addField("__**Réseau**__", "`ipinfo` - `Affiche les Informations d'une IP`\n`dns` - `Montre les DNS d'un host`\n`http` - `Check HTTP du serveur`\n`ping` - `Check PING du serveur`\n`tcp` - `Check TCP du serveur`\n`udp` - `Check UDP du serveur`\n`fivem` - `Affiche les informations d'un serveur FiveM`\n`sd` - `Check le nombre de sous-domaines`\n`proxycheck` - `Check si l'IP est un proxy ou un vpn`");
      embed.addField("__**Stresser**__", "`esc`");
      embed.addField("__**Autre**__", "`passwordgen`\n`ss` - `Fait un screen du site web`\n`numberchecker`\n`invite`\n");
    } else if(args[1] == "EN"){
      embed.setTitle(`:flag_us:`);
      embed.setDescription("__**`Owner:`**__ <@793813273098715146>\n__**`Co-Owner/Developer:`**__ <@868150205852291183>\nNeeded: `<>` | Optionnal: `[]` | Separated by `|` mean that multiple kind of args are usable");
      embed.addField("__**Admin**__", "`methods`, `api`\n`clients` - `<add|remove> <Subscription> <Ping|User ID>`\n`staff` - `<modo|admin|punch> <add|remove> <Ping|User ID>`\n`sub` - `<add|remove> <name> <conccurents> <seconds>`");
      embed.addField("__**Moderation**__", "`setupMute`, `say`, `clear`, `nuke`, `mute`, `unmute`, `kick`, `ban`, `unban`, `softban`, `serverlist`, `leaveserver`");
      embed.addField("__**Network**__", "`ipinfo` - `Affiche les Informations d'une IP`\n`dns` - `Check DNS Server`\n`http` - `Check HTTP Server`\n`ping` - `Check PING Server`\n`tcp` - `Check TCP Server`\n`udp` - `Check UDP Server`\n`fivem` - `Show FiveM Server Informations`\n`sd` - `Check number of subdomains`\n`proxycheck` - `Check if the IP is a proxy or vpn`");
      embed.addField("__**Stresser**__", "`esc`");
      embed.addField("__**Others**__", "`passwordgen`\n`ss` - `screenshot website`\n`numberchecker`\n`invite`\n");
    } else {
      return message.reply("\n:flag_us: Specify `EN` or `FR`\n:flag_fr:Specifie `EN` ou `FR`");
    }
		
    return message.reply({embeds:[embed]})
  }
  
}
