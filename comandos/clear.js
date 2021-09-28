
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("Você não pode usar esse comando sem a permissão `manage_messages`");
    if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
            amount = 1;
        } else {
            amount = message.content.split(' ')[1];
            if (amount > 100) {
            amount = 100;
            }
        }
        await message.channel.bulkDelete(amount, true).then((_message) => {
            message.channel.send(`Deletado \`${_message.size}\` mensagens :broom:`).then((sent) => {
                setTimeout(function () {
                sent.delete();
                }, 7000);
            });
        });
    }
}


exports.config = {
    nome: 'apagar',
    descricao: 'xd',
    aliases: [],
}
