const { MessageEmbed } = require('discord.js');
const mercadopago = require("../utils/mercadopago.js");
const randString = require("../utils/generateString.js");

exports.run = async (client, message, args) => {
      const erro = new MessageEmbed()
          .setTitle(`Uso incorreto`)
          .setDescription(`!buy <script>`)
          .setColor(0x00ae86)
          .setTimestamp();
      if (!args[0]) {
          return message.channel.send(erro);
      } else if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`) ) {
         return message.reply('Você já tem um ticket criado, feche o antigo para abrir um novo!');
      }; 
      client.db.query(
          `SELECT name, price FROM scripts WHERE name = "${args[0]}"`,
          async (err, rows) => {
              if (!rows || rows.length === 0) {
                  return message.channel.send(
                      `:x: **Este script não existe!** `
                  );
              } else {
                let everyoneRole = await message.guild.roles.cache.find(r => r.name === "@everyone")
                let equipeRole = await message.guild.roles.cache.find(r => r.name === "Equipe")
                  message.guild.channels.create(`ticket-${message.author.id}`, {
                      permissionOverwrites: [{
                              id: message.author.id,
                              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                          },
                          {
                            id: equipeRole.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"]
                          },
                          {
                              id: everyoneRole.id,
                              deny: ['VIEW_CHANNEL'],
                          },
                      ],
                      type: 'text',
                      parent: "870979776507170817",
                  }).then(async channel => {
                    var preference = {
                        items: [
                          {
                            title: rows[0].name,
                            quantity: 1,
                            currency_id: 'BRL',
                            unit_price: rows[0].price
                          }
                        ],
                        external_reference : randString(20),
                      };
                      
                      const req = await mercadopago.preferences.create(preference)
                      message.channel.send(`:white_check_mark: **Pedido criado!**`);
                      const embed = new MessageEmbed()
                          .setTitle(message.author.username)
                          .setDescription(`Olá.\nAgradecemos por estar realizando o pedido de **${args[0]}**.\nAguarde até um de nossos membros da Equipe lhe atender.\n\n**Pague utilizando o link abaixo**\n${req.body.init_point}\n\n**Métodos de Pagamento**\n- MercadoPago\n- PIX\n- PicPay\n\nApós efetuar o pagamento, realize uma captura de tela e envie aqui no canal junto com o seu **nome e email**.\n\n**Para fechar este ticket, reaja com 🔒.**`)
                          .setColor(0x00ae86)
                          .setTimestamp();
                      channel.send(embed).then(async m => {
                        client.db.query(`INSERT INTO payments (discordid, channelid, paymentid, script, status) VALUES (${message.author.id}, ${channel.id}, "${req.body.external_reference}", "${rows[0].name}", "created")`)
                          m.react('🔒');
                          const filter = (reaction, user) => reaction.emoji.name && user.id === message.author.id;
                          const collector = m.createReactionCollector(filter);
                          collector.on('collect', async r => {
                              switch (r.emoji.name) {
                                  case '🔒':                   
                                          channel.updateOverwrite(message.author.id, {
                                          VIEW_CHANNEL: false,
                                          SEND_MESSAGES: false,
                                          ATTACH_FILES: false,
                                          READ_MESSAGE_HISTORY: false,
                                      }).then(() => {
                                          channel.send(`Successfully closed ${channel.name}`);
                                      });
                                    break;
                              }
                          })
                      });
                  });
              }
          });

  },
  exports.config = {
      nome: 'buy',
      descricao: 'Inicia a compra de um script',
      aliases: [],
  }