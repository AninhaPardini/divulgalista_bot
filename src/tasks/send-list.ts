import channelsListMessage from "src/messages/channels-list.message";
import { Telegraf } from "telegraf";
import { CronJob } from "cron";
import { prisma } from "../db";

async function channelListMessage(bot: Telegraf) {
  try {
    const channels = await prisma.channel.findMany();

    for (let i = channels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [channels[i], channels[j]] = [channels[j], channels[i]];
    }

    const links = channels.slice(0, 19).map((channel) => ({
      text: channel.title,
      callback_data: channel.title,
      url: channel.link_invite,
    }));

    links.push([
      {
        text: "PARTICIPAR DA LISTA",
        url: "http://t.me/DivulgaLista_Bot",
      },
    ]);

    if (!links) { return; }

    for (const channel of channels) {
      console.log(`mensagem enviada para o canal: ${channel.title}`);
      await bot.telegram.sendMessage(
        channel.id,
        "Venha conferir os melhores canais aqui!", {
          reply_markup: {
            inline_keyboard: channels,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        }
      );
    }
  }
  catch(ex) {
    console.error(ex);
  }
}

const sendMessageTask = (bot: Telegraf) => {

  const jobMoring = new CronJob(
    "* 10 * * *", // cronTime
    function () {
      channelListMessage(bot)
    }, // onTick
    null, // onComplete
    true, // start
    "America/Sao_Paulo" // timeZone
  );

  const jobEvening = new CronJob(
    "10 18 * * *", // cronTime
    function () {
      channelListMessage(bot)
    }, // onTick
    null, // onComplete
    true, // start
    "America/Los_Angeles" // timeZone
  );

  jobEvening.start();
}


export default sendMessageTask;
