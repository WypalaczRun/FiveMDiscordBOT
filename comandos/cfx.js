const { MessageEmbed } = require('discord.js')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Insira o código CFX junto ao comando!")
    const req = new XMLHttpRequest();
    req.open('GET', `https://servers-frontend.fivem.net/api/servers/single/${args[0]}`, false);
    req.send(null);
    if (req.readyState === req.DONE) {
        if (req.status === 200) {
            var data = JSON.parse(req.responseText);
            var IPPorta = data.Data.connectEndPoints[0];
            var resultado = IPPorta.split(":");
            const req2 = new XMLHttpRequest();
            req2.open('GET', `http://ip-api.com/json/${resultado[0]}`, false);
            req2.send(null);
            if (req2.readyState === req.DONE) {
                if (req2.status === 200) {
                    var data2 = JSON.parse(req2.responseText);
                    const embed = new MessageEmbed()
                    .setColor(0x00AE86)
                    .setDescription(`
                    **Detalhes**  
                     Nome do Servidor: ${"`"+data.Data.hostname+"`"}

                     **IP:Porta**  
                     ${"`"+data.Data.connectEndPoints+"`"}

                    **Detalhes do Servidor** 
                     IP: ${"`"+resultado[0]+"`"} 
                     Porta: ${"`"+resultado[1]+"`"}
                     País: ${"`"+data2.country+"`"} 
                     ISP: ${"`"+data2.isp+"`"} 
                     Org: ${"`"+data2.org+"`"} 

                    **FiveM Server** 
                      Players Online: ${"`"+data.Data.clients+"`"}
                      Máximo de Jogadores: ${"`"+data.Data.sv_maxclients+"`"}
                      Versão do Servidor: ${"`"+data.Data.server+"`"}
                      Info(JSON): http://${data.Data.connectEndPoints + "/players.json"} `);
                    return message.channel.send(embed);
                } else {
                    return message.channel.send("Erro na GEOAPI, aguarde um pouco e tente novamente");
                 }
            } else {
                return message.channel.send("Erro interno, contate Wypalacz#0007");
            }
        } else {
            return message.channel.send("Código CFX inválido");
        }
    } else {
        return message.channel.send("Erro interno, contate Wypalacz#0007");
    }
}

exports.config = {
    nome: 'cfx',
    descricao: 'Mostra as informações do servidor',
    aliases: [],
}