const mercadopago = require("mercadopago");
const config = require("../config.js");

mercadopago.configure({
    access_token: config.mercadopago.token
  });


module.exports = mercadopago;