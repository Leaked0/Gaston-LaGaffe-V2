let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'nuke')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply("You are not allowed to use this command !")
    }

    let permOverwritesCollection = message.channel.permissionOverwrites.cache.filter(pOver => pOver.type === 'role');
            permOverwritesCollection = permOverwritesCollection.filter(pOver => message.guild.roles.cache.has(pOver.id));
            let permOverwrites = permOverwritesCollection.map(pOver => {
                return {
                    id: pOver.id,
                    allowed: pOver.allow.bitfield.toString(),
                    denied: pOver.deny.bitfield.toString(),
                };
            });

			client.channels.cache.get(message.channel.id).clone({
				name: message.channel.name,
				type: message.channel.type,
				topic: message.channel.topic,
				nsfw: message.channel.nsfw,
				parent: message.channel.parent,
				permLocked: message.channel.permissionsLocked ? message.channel.permissionsLocked : false,
				permOverwrites: message.channel.permissionsLocked ? null : permOverwrites,
				position: message.channel.rawPosition,
				rateLimitPerUser: message.channel.rateLimitPerUser,
				reason: `Nuked by ${message.author.tag}`
			}).then(channel => {
				channel.send(`Nuked by <@${message.author.id}>`);
			});
			client.channels.cache.get(message.channel.id).delete();

    
  }
}
