const { MessageEmbed } = require('discord.js')
const config = require('../config.js')
const moment = require('moment')
moment.locale('pt-br')
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " dia" : " dias") + " atrás";
    };
let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setTimestamp()
    .setThumbnail()
    .setAuthor("Phoenix", "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
    .setTitle("Informações do Servidor")
    .setColor("0ED4DA")
    .setThumbnail(message.guild.iconURL)
    .addField("Nome do Servidor", `${message.guild.name} (${message.guild.nameAcronym})`, true)
	.addField(":computer: ID", message.guild.id, true)
	.addField(":earth_americas: Região", region[message.guild.region], true)
	.addField(":speech_balloon: Canais", message.guild.channels.cache.size, true)
	.addField(":busts_in_silhouette: Membros ", `${message.guild.members.cache.size}`, true)
    .addField(':crown: Dono do Servidor', message.guild.owner.user.tag, true)
    .addField(":date: Criado em", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
    return message.channel.send(embed)
}

exports.config = {
    nome: 'serverinfo',
    descricao: 'Mostra informações sobre o servidor ',
    aliases: [],
}
