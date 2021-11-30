let staff = require('../../../../staff.json');

module.exports = async function (message, client, prefix, needle) {

  if (message.content.startsWith(prefix + 'clear')) {
    if(!staff[message.author.id] || !staff[message.author.id]["staff"]){
      return message.reply({content: "You are not allowed to use this command !"})
    }

    args = message.content.slice(7).split(' ');

    if (args[0] == undefined || args[0] == '' || args[0] < 1 || args[0] > 99) {
      return message.reply({content: 'Specify a number of messages to clear(between 1 and 99)'});
    }
    message.delete().catch(() => {});
    let filter = message => !message.pinned;
    const messages = await message.channel.messages.fetch({
      limit: parseInt(args[0]) + 1
    }).then(msgs => msgs.filter(filter));
    message.channel.bulkDelete(messages, true).then(({ size }) => {
      message.channel.send({ content: `Deleted \`${size-1}\` message${size === 1 ? "" : "s"}` });
    }).catch(err => {
      console.log(err);
      message.channel.send({ content: "I'm not allowed to do that !" });
    });

    
  }
}
