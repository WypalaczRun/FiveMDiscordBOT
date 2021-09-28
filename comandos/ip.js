const { MessageEmbed } = require("discord.js");
const MysqlManager = require('../database.js');
const config = require('../config.js')

exports.run = async (client, message, args) => {
  const erro = new MessageEmbed()
    .setTitle(`Uso incorreto`)
    .setDescription(`!ip <script> <ip>`)
    .setColor(0x00ae86)
    .setTimestamp();
  if (!args[0] || !args[1]) return message.channel.send(erro);
  client.db.query(
    `SELECT script, ip FROM subs WHERE discordid = "${message.author.id}" AND script = "${args[0]}" `,
    async (err, rows) => {
      if (!rows || rows.length === 0) {
        message.channel.send(
          `:x: Você não possui o script **${args[0]}**, contate um administrador caso ache que isso seja um engano.`
        );
      } else {
        client.db.query(
          `UPDATE subs SET ip = "${args[1]}" WHERE discordid = "${message.author.id}" AND script = "${args[0]}"`,
          async (err, rows) => {
            if (rows.affectedRows >= 1) {
              return message.channel.send(
                `:white_check_mark: **IP atualizado para o script** **__${args[0]}__** `
              );
            }
          }
        );
      }
    }
  );
};

exports.config = {
  nome: "ip",
  descricao: "Atualiza o IP dos scripts",
  aliases: [],
};
