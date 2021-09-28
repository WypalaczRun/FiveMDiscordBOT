const { MessageEmbed } = require('discord.js');

module.exports = class ImperialGostoso extends MessageEmbed {
    constructor(){
        super()
            this.setAuthor(`Teste`, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
            this.setColor(0x00AE86)
            this.setURL('xvideos.com');
            this.setTimestamp();
    }
}