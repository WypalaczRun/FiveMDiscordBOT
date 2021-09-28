exports.run = async (client, message, args) => {
        let texto = message.content.slice(';enviarmsg'.length);
        message.guild.members.forEach(member => {
        if (member.id != client.user.id && !member.user.bot) member.send(texto);
        });
}

exports.config = {
    nome: 'enviarmsg',
    descricao: 'Envia mensagens no privado de todos os usuários do servidor!',
    aliases: [],
}
