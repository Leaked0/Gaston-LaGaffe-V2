const fs = require("fs");
let staff = require('../../../../staff.json');
module.exports = async function (message, client, prefix, needle) {
  
  if (message.content.startsWith(prefix + 'staff')) {

    args = message.content.slice(1).split(' ')

    if (!args[1]) return message.reply("\n:x: please specify `modo` or `admin` or `punch`");
    if (!args[2]) return message.reply("\n:x: please specify `add` or `remove`");
    let user = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[3]);
    if(!user) return message.reply("Ping someone or give a valid User ID");
    user = user.user ? user.user : user;

    staff[user.id] = {
      staff: staff[user.id] == null ? false : staff[user.id]["staff"],
      type: staff[user.id] == null ? "nope" : staff[user.id]["staff"]
    };

    if(!staff[message.author.id] || !staff[message.author.id]["staff"] || staff[message.author.id]["type"] != "admin"){
      return message.reply("You are not admin !")
    }

    if(user.id == message.author.id){
      return message.reply("You can't manage yourself !");
    }

    switch(args[1]){
      case "modo":
        if(args[2] == "add"){
          staff[user.id] = {
            staff: true,
            type: "modo"
          };
        } else if(args[2] == "remove"){
          staff[user.id] = {
            staff: false,
            type: "nope"
          };
        } else {
          return message.reply("\n:x: please specify `add` or `remove`")
        }
        fs.writeFile("./staff.json", JSON.stringify(staff), (err) => {
          if (err) console.log(err)
        });
        return message.reply(`\`\`\`json\n${JSON.stringify(staff[user.id])}\`\`\``);
        break;
      case "admin":
        if(args[2] == "add"){
          staff[user.id] = {
            staff: true,
            type: "admin"
          };
        } else if(args[2] == "remove"){
          staff[user.id] = {
            staff: false,
            type: "nope"
          };
        } else {
          return message.reply("\n:x: please specify `add` or `remove`")
        }
        fs.writeFile("./staff.json", JSON.stringify(staff), (err) => {
          if (err) console.log(err)
        });
        return message.reply(`\`\`\`json\n${JSON.stringify(staff[user.id])}\`\`\``);
        break;
      case "punch":
        if(args[2] == "add"){
          staff[user.id] = {
            staff: true,
            type: "punch"
          };
        } else if(args[2] == "remove"){
          staff[user.id] = {
            staff: false,
            type: "nope"
          };
        } else {
          return message.reply("\n:x: please specify `add` or `remove`")
        }
        fs.writeFile("./staff.json", JSON.stringify(staff), (err) => {
          if (err) console.log(err)
        });
        return message.reply(`\`\`\`json\n${JSON.stringify(staff[user.id])}\`\`\``);
        break;
      default:
        return message.reply("\n:x: please specify `modo` or `admin`")
        break;

      }
  }

}
