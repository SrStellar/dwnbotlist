const { Router } = require("express");
const { checkAuth } = require("../");

module.exports = client => {
  const router = Router();
  let Discord = require("discord.js");
  router.post("/stats",  async (req, res) => {
    let model = require("../.././models/bot.js");
    let authtoken = req.headers.auth;
    if (!authtoken) return res.json({ error: "Inclua um token de API" });
    let data = await model.findOne({ apiToken: authtoken });
    if (!data) return res.json({ error: "Token de API inválido" });
    let servers = req.body.guilds;
    if (!servers) return res.json({ error: "Por favor inclua a contagem do servidor" });
    if (isNaN(servers))
      return res.json({ error: "Please include valid server count" });
    if (servers <= 0)
      return res.json({ error: "Please include valid server count" });
    data.servers = servers;
    await data.save();
    return res.json({ success: true, message: data });
  });

  return router;
};
