const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AaQQKUDLEhf8Za4GtXmogRJ7PbQ-4oXCjNeWi9naNzqPnyfaKQ-dOEcSCEwYL20Cvcz6F-w37hikUn9l",
  client_secret:
    "EOeQi_HY1pHElCP97g74UJaztx8VGTZj6-vsG6EapGU3qPuHcBStYeSJ8Lvv1C88aTWLtnK-UGQIkDsw",
});

module.exports = paypal;
