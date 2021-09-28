const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    if(message.member.hasPermission("ADMINISTRATOR")){
    let texto = message.content.slice(';say'.length);
    message.delete()
    const embed = new MessageEmbed()
    .setColor('#c50606')
    .setThumbnail(message.guild.iconURL())
    .setAuthor("Phoenix BOT", message.guild.iconURL())
    .setDescription(texto)
    .setTimestamp()
    .setFooter("Phoenix BOT");
    return message.channel.send(embed);
    } else {
        message.delete()
        return;
    }
}



exports.config = {
    nome: 'say',
    descricao: 'xd',
    aliases: [],
}
