let staff = require('../../../../staff.json');

module.exports = async function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'unban')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply({content: "You are not allowed to use this command !"})
    }

    args = message.content.slice(1).split(' ');

    if (args[1] == undefined || args[1] == '') {
      return message.reply({content: 'Specify a User ID'})
    }
    let fail = false;
    
    await message.guild.members.unban(args[1], `Unbanned By ${message.author.tag}`).catch(() => { fail = true; return message.reply({	content: `Failed to unban ${args[1]} !`, allowedMentions: {repliedUser: true}}) });
    if(fail == false){
      return message.reply({content: `<@${message.author.id}> just unbanned \`${args[1]}\``});
    }
  }
}
