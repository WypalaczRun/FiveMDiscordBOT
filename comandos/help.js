const { MessageEmbed } = require('discord.js');
const config = require("../config.js");
exports.run = async (client, message) => {
    const embed = new MessageEmbed()
    .setDescription(`Olá, aqui estão os meus comandos!`)
    .setColor(0x00AE86)
    .setTimestamp()
    client.comandos.forEach(comandos => {
      embed.addField(`${config.prefix}${comandos.config.nome}`, `${comandos.config.descricao}`);
    }
  )
  message.author.send(embed)
  .then(() => message.reply('Enviei os comandos no seu privado!'));
},
exports.config = {
    nome: 'help',
    descricao: 'Mostra os comandos disponiveis para você',
    aliases: [],
}
