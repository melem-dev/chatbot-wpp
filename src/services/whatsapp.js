const { Client, LocalAuth } = require("whatsapp-web.js");
const Ev = require("./events");

const Whats = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

Whats.initialize();

Whats.on("qr", (qr) => Ev.emit("wpp_qr", qr));

Whats.on("authenticated", () => Ev.emit("wpp_auth"));

Whats.on("ready", () => {
  Whats.sendMessage(Whats.info.wid._serialized, "Olá! sou o ChatBot :)");
  return Ev.emit("wpp_ready");
});

// message_create desempanha a mesma função!
// Whats.on("message", (data) => Ev.emit("wpp_message", data));

Whats.on("message_create", (data) => Ev.emit("wpp_message", data));
Ev.on("chatbot_message", ({ from, text }) => Whats.sendMessage(from, text));
