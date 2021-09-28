const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    let texto = message.content.slice(';sugerir'.length);
    message.delete
    if(texto.length > 2){
    const embed = new MessageEmbed()
    .setColor('#c50606')
    .setThumbnail(message.guild.iconURL())
    .setAuthor("Sugestão", message.guild.iconURL())
    .setTimestamp()
    .setDescription(texto)
    .setFooter("Sugestão de " + message.author.username, message.author.avatarURL());
    return message.channel.send(embed).then(m =>{
        m.react('👍');
        m.react('👎');
       }) 
    } else {
       return
    }
};


exports.config = {
    nome: 'sugerir',
    descricao: 'xd',
    aliases: [],
}
