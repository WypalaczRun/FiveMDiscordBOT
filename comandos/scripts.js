const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    await client.db.query("SELECT name FROM scripts", async (err, rows) =>{
    if(!rows || rows.length === 0) {
        return message.channel.send(`Não encontrei scripts a venda no momento.`);
    }
    const embed = new MessageEmbed()
    .setTitle(`Scripts (${rows.length})`)
    .setColor(0x00AE86)
    .addField(`Nome`,rows.map(script => script.name))
    return message.channel.send(embed)
    })
}

exports.config = {
    nome: 'scripts',
    descricao: 'Mostra os scripts a venda',
    aliases: [],
}