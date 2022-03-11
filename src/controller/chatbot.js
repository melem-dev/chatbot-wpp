const Ev = require("../services/events");

module.exports = (data) => {
  if (data.body === "!ping") {
    const diff = new Date().getTime() - data.timestamp * 1000;
    Ev.emit("chatbot_message", { from: data.from, text: `${diff} ms` });
  }
};
