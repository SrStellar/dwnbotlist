const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  let bot = message.mentions.members.first();
  let model = require("../models/bot.js");
  let data = await model.findOne({ bot: bot.id });
  if (!data) return message.reply("Thats not a bot on the botlist");
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#2F3136")
    .setAuthor(bot.user.tag)
    .addField("Prefix:", data.prefix, true)
    .addField("Desc. pequena:", data.shortDesc, true)
    .addField("Website:", data.website ? data.website : "Nenhum", true)
    .addField("Github:", data.github ? data.github : "Nenhum", true)
    .addField(
      "Servidor de Suporte:",
      `https://discord.gg/${data.support ? data.support : "None"}`,
      true
    )
    .addField("Votos:", data.votes, true)
    .addField("Servers:", data.servers, true)
    .addField("Adicionado:", timeSince(data.submittedOn), true)
    .addField("Aprovado hà:", timeSince(data.approvedOn), true)
    .addField("Invite:", data.invite ? data.invite : "Nenhum", true)
    .addField("Livraria:", data.lib, true)
    .addField("Tags:", data.tags.join(", "), true)
    .addField(
      "Owners:",
      data.owners
        .filter(o => o !== "")
        .map(o => `<@${o}>`)
        .join(" | "),
      true
    );
  message.channel.send(embed);
};
module.exports.help = {
  name: "botinfo",
  description: "Pings the bot",
  usage: " <bot>",
  owner: false,
  cat: "info",
  aliases: ["bi"]
};
