const { MessageEmbed } = require("discord.js");
const MysqlManager = require('../database.js');
const config = require('../config.js')

exports.run = async (client, message, args) => {
  const phoenix = new MysqlManager(client, config);
  const erro = new MessageEmbed()
    .setTitle(`Uso incorreto`)
    .setDescription(`!ip <script> <ip>`)
    .setColor(0x00ae86)
    .setTimestamp();
  if (!args[0] || !args[1]) return message.channel.send(erro);
  if(phoenix.checkScript(message,args[0])) {
    phoenix.updateScript(message,args[0],args[1])
  }
};

exports.config = {
  nome: "ip",
  descricao: "Atualiza o IP dos scripts",
  aliases: [],
};
