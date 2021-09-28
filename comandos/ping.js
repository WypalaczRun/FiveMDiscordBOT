const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor(0x00AE86)
    .setTitle(`Pong!`)
    .setDescription(`🏓 | ${Math.floor(client.ws.ping).toFixed(0)}ms`);
    return message.channel.send(embed);
}

exports.config = {
    nome: 'ping',
    descricao: 'Mostra a latência do bot',
    aliases: [],
}
