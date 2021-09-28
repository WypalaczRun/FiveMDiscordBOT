const config = require('../config.js')
module.exports = async message => {
    let client = message.client
    let args = message.content.split(' ');
    let command = args.shift().slice(client.prefixo.length);
    if(command) command = command.toLowerCase()

    if (!message.content.startsWith(client.prefixo)) return
    let cmd = client.comandos.get(command) || client.comandos.get(client.aliases.get(command))
    if(cmd) {
        if(!config.canalComandos.includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR") 
        && !client.config.donos.includes(message.author.id)) return message.reply(`Você só pode utilizar comandos no canal <#${config.canalComandos}> !`)
        cmd.run(client, message, args)
    }
    else return message.reply('não encontrei o comando digitado!')
}