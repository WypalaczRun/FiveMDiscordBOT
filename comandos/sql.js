const config = require('../config.js')
const { Collection,MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    if(!config.donos.includes(message.author.id)) return message.reply("você não é um dos meus criadores!")
    client.db.query(args.join(" "), (erro,rows) => {
        if(erro) return message.reply(`Erro: \`\`\`${erro.sqlMessage}\`\`\``)
        if(rows)  {
            if(rows.length > 1){
                let paginas = new Collection();
                for(let i = 0; i < rows.length; i++) {
                    let embed = new MessageEmbed()
                    .setDescription(JSON.stringify(rows[i],null,'\n'))
                    .setTimestamp()
                    paginas[i] = {embed};
                };
            }
            else 
			message.reply(`Sucesso: \`\`\`${JSON.stringify(rows[0])}\`\`\``)
        }
    })
}

exports.config = {
    nome: 'sql',
    descricao: 'Executa uma SQL',
    aliases: [],
}
