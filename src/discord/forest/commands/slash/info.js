module.exports = async (client, prefix, needle, create, reply) => {

    create('802831596204982272', {
        name: 'info',
        description: 'gives the description of a cmd',
        options: [{
            name: 'name',
            description: 'cmd name',
            required: true,
            type: 3
        }]
    })

    client.ws.on('INTERACTION_CREATE', async i => {

        if (i.data.name.toLowerCase() === 'info') {

            if (!i.data.options[0].value) return

            let json = require('../../other/commands.json')
            json = json.find(a => a.name === i.data.options[0].value)

            if (!json) {
                return reply(i, {
                    title: 'error',
                    description: `:x: The cmd **${i.data.options[0].value}** does not exist!`,
                    color: "RANDOM"
                }, '4')
            } else return reply(i, {
                title: 'info: ' + json.name,
                description: `**Description:** *${json.description}*\n\n\n**Syntax:** \`${json.syntax}\`\n\n**Return:** \`\`\`${json.return}\`\`\``,
                color: "RANDOM"
            }, '4')

        }


    })

}
