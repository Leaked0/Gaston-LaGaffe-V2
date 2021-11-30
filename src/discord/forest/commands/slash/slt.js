module.exports = async (client, prefix, needle, create) => {

    create('802831596204982272', {
        name: 'cc',
        description: 'cc cv ?'
    })

    client.ws.on('INTERACTION_CREATE', async i => {

        cmd = i.data.name.toLowerCase()


        if(cmd === 'cc') {

            client.api.interactions(i.id, i.token).callback.post({

                data: {
                    type: 5,
                    data: {
                        content: 'cc cv ?'
                    }
                }

            })

        }


    })

}