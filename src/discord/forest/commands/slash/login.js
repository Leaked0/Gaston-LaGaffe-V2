module.exports = async (client, prefix, needle, create, reply) => {
    const rdm = () => {
            for (var e = "", n = 0; n < 6; n++) e += "0123456789ABCDEF" [Math.floor(16 * Math.random())];
            return parseInt(e, 16);
        },
        key = 'sltcv'

    create('802831596204982272', {
        name: 'login',
        description: 'connection with a key',
        options: [{
            name: 'key',
            description: 'your key',
            required: true,
            type: 3
        }]
    })

    client.ws.on('INTERACTION_CREATE', async i => {

        cmd = i.data.name.toLowerCase()
        if (cmd === 'login') {

            input = i.data.options[0].value

            if (!input) return

            if (input !== key) return reply(i, {
                title: 'error',
                description: `:x: Authentication failed!`,
                color: rdm()
            }, '4')

            if (input === key) return reply(i, {
                title: 'success',
                description: `:white_check_mark: Logged in as ${i.member.user.username}!`,
                color: rdm()
            }, '4')

        }


    })

}