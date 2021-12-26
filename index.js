const config = require("./config.js");
const { Collection, Client } = require("discord.js");
const fs = require('fs');
const client = new Client({ disableEveryone: true, fetchAllMembers: true});
const MysqlManager = require('./database.js');
const Embed = require('./embed.js');

new MysqlManager(client, config);//Inicia a database, e salva ela no client
client.comandos = new Collection();
client.aliases = new Collection();
client.embed = Embed;
client.prefixo = config.prefix;//Salva o prefixo no client, para não precisar ter que chamar config depois
client.config = config; //Salva config na client...
require('./eventos/loader')(client);//Inicia os eventos
require('./utils/errorHandler')(client); 

fs.readdir(`./comandos/`, (err, arquivos) => {
    if (err) console.error(err);
    arquivos.forEach(cmd => {
        let comando = require(`./comandos/${cmd}`);
        console.log(`[CMD] Carregando comando: "${comando.config.nome}"...`);
        client.comandos.set(comando.config.nome, comando);
        comando.config.aliases.forEach(alias => {
        client.aliases.set(alias, comando.config.nome);
        });
    });
});

client.login(config.token);
