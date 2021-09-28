const { MessageEmbed } = require('discord.js');
const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

exports.run = async (client, message, args) => {
      if(!client.config.donos.includes(message.author.id)) return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        const embed = new MessageEmbed()
        .setTitle(`Sucesso!`)
        .setDescription(`Entrada \`\`\`${args.join(" ")}\`\`\`\n\nSaída:\`\`\`${clean(evaled)}\`\`\``)
        .setColor('#ffffff')
        message.reply(embed)
      } catch (err) { const embed = new MessageEmbed()
        .setTitle(`Erro!`)
        .setDescription(`Entrada \`\`\`${message.content}\`\`\`\n\nSaída:\`\`\`${clean(err)}\`\`\``)
        .setColor('#ffffff')
        message.reply(embed)
      }
}

exports.config = {
    nome: 'eval',
    descricao: 'Comando especial',
    aliases: [],
}
