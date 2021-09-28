const requerEvento = (event) => require(`../eventos/${event}`)
const config = require('../config.js')
const { MessageEmbed } = require('discord.js');
const MysqlManager = require('../database.js');
const mercadopago = require('../utils/mercadopago.js');

module.exports = async client => {
	const phoenix = new MysqlManager(client, config);
	client.on("ready", async () => {
		console.log("[READY] BOT iniciado com sucesso.")
		client.user.setActivity("zzzZzZ", {
			type: 'WATCHING'
		});
		function verifyPayments() {
			client.db.query("SELECT * FROM payments", async (err, rows) => {
				rows.forEach(async payment => {
					if (payment.status !== "approved") {
						var filters = {
							external_reference: payment.paymentid
						};
						const req = await mercadopago.payment.search({
							qs: filters
						})
						if (req.body.paging.total != 0) {
							var result = req.body.results[0].status;
							if (payment.status !== result) {
								const paymentchannel = client.channels.cache.get(payment.channelid);
								switch (result) {
									case "approved":
										phoenix.createSubscription(payment.discordid,payment.script,payment.channelid,payment.paymentid,result)
										break;
									case "pending":
										await sendChangedStatus("Aguardando Pagamento")
										break;
									case "cancelled":
										phoenix.deleteSubscription(payment.discordid,payment.channelid,payment.paymentid)
										break;
								}
							}
						}
					}
				})
			})
		}
		setInterval(function() {
			verifyPayments();
		}, 20000);
	});
	client.on("warn", (err) => {
		console.log(err.message)
	});
	client.on("error", (err) => {
		console.log(err.message)
	});
	client.on("disconnect", (err) => {
		console.log(err.message)
	});
	client.on("reconnect", (err) => {
		console.log(err.message)
	});
	client.on('guildMemberAdd', membro => {
		if (membro.guild.id == '569014295891804160') membro.addRole('571003630275002388').catch();
	});

	client.on('message', requerEvento('message'));
}