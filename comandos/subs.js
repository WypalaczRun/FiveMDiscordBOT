const { MessageEmbed } = require('discord.js');
const MysqlManager = require('../database.js');
const config = require('../config.js');

exports.run = async (client, message, args) => {
    client.db.query(
        `SELECT script, ip FROM subs WHERE discordid = "${message.author.id}"`,
        async (err, rows) => {
          if (err) throw err;
          if (!rows || rows.length === 0) {
            return message.channel.send(
              `:negative_squared_cross_mark: **Você não possui nenhum script!** `
            );
          }
          const embed = new MessageEmbed()
            .setTitle(`Assinaturas (${rows.length})`)
            .setColor(0x00ae86)
            .addField(
              `Nome`,
              rows.map((x) => x.script),
              true
            )
            .addField(
              `IP`,
              rows.map((x) => (x.ip ? x.ip : "Nenhum")),
              true
            );
          return message.channel.send(embed);
        }
      );
}

exports.config = {
    nome: 'subs',
    descricao: 'Verifica suas licenças',
    aliases: [],
}