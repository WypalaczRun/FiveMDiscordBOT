const mysql = require("mysql");
const { MessageEmbed } = require('discord.js');

module.exports = class MysqlManager {
  constructor(client, config) {
    this.client = client;
    this.config = config;
    this.db = null;
    this.init();
    this.loadEvents();
  }
  init() {
    this.db = mysql.createConnection({
      host: this.config.database.host,
      port: this.config.database.port,
      user: this.config.database.user,
      password: this.config.database.password,
      database: this.config.database.name,
      charset: "utf8mb4",
    });
    this.client.db = this.db;

    setInterval(() => {
      console.log("[MYSQL] Ping!");
      this.reconectar();
    }, 4 * 60 * 60 * 1000);
  }
  reconectar() {
    this.db.destroy();
    this.init();
  }
  loadEvents() {
    this.db.on("connect", () => console.log("[MYSQL] Conectado!"));
    this.db.on("error", (erro) =>
      console.error("[MYSQL] Erro: " + erro.message)
    );
    this.db.on("end", () => this.reconectar());
  }

  createSubscription(discordid, script, channelid, paymentid, result) {
    const channel = this.client.channels.cache.get(channelid);
    this.db.query(
      `UPDATE payments SET status = '${result}' WHERE paymentid = '${paymentid}'`,
      async (err, rows) => {
        if (rows.affectedRows == 1) {
          console.log(`ID de Pagamento: ${paymentid} alterado para ${result}`);
        }
      }
    );
    this.db.query(
      `INSERT INTO subs (discordid, script) VALUES("${discordid}", "${script}")`,
      async (err, rows) => {
        if (rows.affectedRows == 1) {
          channel.send(
            `<@${discordid}>, seu pagamento já foi encontrado e sua licença para o script já foi gerada, para verificar utilize o comando **!subs**.`
          );
        }
      }
    );
  }
  deleteSubscription(discordid, channelid, paymentid) {
    const channel = this.client.channels.cache.get(channelid);
    this.db.query(
      `DELETE FROM payments WHERE paymentid = '${paymentid}'`,
      async (err, rows) => {
        if (rows.affectedRows == 1) {
          channel.send(
            `<@${discordid}>, seu pagamento foi negado e sua compra foi cancelado, para realizar novamente abre outro **ticket**.`
          );
        }
      }
    );
  }
};
