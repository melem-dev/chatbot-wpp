const express = require("express");
const app = express();

const Ev = require("./services/events");
const QR = require("qrcode-terminal");

require("./services/whatsapp");
const ChatBotController = require("./controller/chatbot");

Ev.on("wpp_qr", (qr) => QR.generate(qr, { small: true }));

Ev.on("wpp_ready", () => console.log("Whats App Pronto"));

Ev.on("wpp_auth", () => console.log("Whats App Autenticado"));

Ev.on("wpp_message", ChatBotController);

app.listen(3000, () => console.log("Running at port 3000"));
