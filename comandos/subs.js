const { MessageEmbed } = require('discord.js');
const MysqlManager = require('../database.js');
const config = require('../config.js');

exports.run = async (client, message, args) => {
    const phoenix = new MysqlManager(client, config);
    phoenix.checkScripts(message)
}

exports.config = {
    nome: 'subs',
    descricao: 'Verifica suas licenças',
    aliases: [],
}