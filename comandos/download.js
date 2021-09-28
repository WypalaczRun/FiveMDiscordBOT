const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send(erro);
  }
  client.db.query(
    `SELECT script FROM subs WHERE discordid = "${message.author.id}" AND script = "${args[0]}"`,
    async (err, rows) => {
      const erro = new MessageEmbed()
        .setTitle(`Uso incorreto`)
        .setDescription(`!download <script> `)
        .setColor(0x00ae86)
        .setTimestamp();
      if (err) throw err;
      else if (!rows || rows.length === 0) {
        return message.channel.send(
          `:x: **Você não possui esse script!** `
        );
      } else if(rows.length == 1) {
        fs.stat(`./arquivos/${args[0]}.zip`, (error,exists) => {
          if(error) console.log(error);
          if (exists) {
              const scriptAtt = new Discord.MessageAttachment(`./arquivos/${args[0]}.zip`)
              message.channel.send(":white_check_mark: **Download enviado no seu privado!**")
              message.author.send(scriptAtt)
          } else {
            message.channel.send(":x: **Arquivo não encontrado, contate um administrador!**")
          }
        }) 
      }
    }
  );
};

exports.config = {
  nome: "download",
  descricao: "Faz o download dos scripts comprados",
  aliases: [],
};
