const fs = require("fs");
let abonnements = require('../../../../abonnements.json');
let staff = require('../../../../staff.json');

module.exports = function (message, client, prefix, needle) {
  
  if (message.content.startsWith(prefix + 'sub')) {

    args = message.content.slice(1).split(' ')
    
    if(!staff[message.author.id] || !staff[message.author.id]["staff"] || staff[message.author.id]["type"] != "admin"){
      return message.reply("You are not admin !")
    }

    if (!args[1]) return message.reply("\n:x: please specify `add` or `remove`");
    if (!args[2]) return message.reply("\n:x: please specify a name");
    if (!args[3]) return message.reply("\n:x: please specify a number of conccurents");
    if (!args[4]) return message.reply("\n:x: please specify a number of seconds");

    switch(args[1]){
      case "add":
        abonnements[args[2]] = {
          conccurents: args[3],
          seconds: args[4]
        };
        fs.writeFile("./abonnements.json", JSON.stringify(abonnements), (err) => {
          if (err) console.log(err)
        });
        return message.reply(`\`\`\`json\n${JSON.stringify(abonnements[args[2]])}\`\`\``);
        break;
      case "remove":
        delete abonnements[args[2]]
        fs.writeFile("./abonnements.json", JSON.stringify(abonnements), (err) => {
          if (err) console.log(err)
        });
        return message.reply(`\`\`\`json\n${JSON.stringify(abonnements[args[2]])}\`\`\``);
        break;
      default:
        return message.reply("\n:x: please specify `add` or `remove`")
        break;

      }
  }

}
