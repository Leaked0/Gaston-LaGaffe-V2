const fs = require("fs");
let clients = require('../../../../clients.json');
let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {
  
  if (message.content.startsWith(prefix + 'clients')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply({content: "\n:x: please specify `add` or `remove`"});
    let user = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[2]);
    if(!user) return message.reply({content: "Ping someone or give a valid User ID"});
    user = user.user ? user.user : user;

    clients[user.id] = {
      client: clients[user.id] == null ? false : clients[user.id]["client"],
      type: clients[user.id] == null ? "nope" : clients[user.id]["type"]
    };

    if(!staff[message.author.id] || !staff[message.author.id]["staff"] || staff[message.author.id]["type"] != "admin"){
      return message.reply({content: "You are not admin !"})
    }

    switch(args[1]){
      case "add":
        clients[user.id] = {
          client: true,
          type: args[2]
        };
        fs.writeFile("./clients.json", JSON.stringify(clients), (err) => {
          if (err) console.log(err)
        });
        return message.reply({content: `\`\`\`json\n${JSON.stringify(clients[user.id])}\`\`\``});
        break;
      case "remove":
        clients[user.id] = {
          client: false,
          type: "nope"
        };
        fs.writeFile("./clients.json", JSON.stringify(clients), (err) => {
          if (err) console.log(err)
        });
        return message.reply({content: `\`\`\`json\n${JSON.stringify(clients[user.id])}\`\`\``});
        break;
      default:
        return message.reply({content: "\n:x: please specify `add` or `remove`"})
        break;

      }
  }

}
