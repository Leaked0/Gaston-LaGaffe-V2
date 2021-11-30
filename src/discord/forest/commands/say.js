let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'say')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply("You are not allowed to use this command !")
    }

    args = message.content.slice(5).split(' ');

    if (args[0] == undefined || args[0] == '') {
      return message.reply('Specify something to say')
    }
    message.delete().catch(() => {});

    message.channel.send(`${args.join(" ")}`);
  }
}
