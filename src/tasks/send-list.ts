import channelsListMessage from "src/messages/channels-list.message";
import { Telegraf } from "telegraf";
import { CronJob } from "cron";
import { prisma } from "../db";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";

async function channelListMessage(bot: Telegraf) {
  try {
    const channels = await prisma.channel.findMany();

    for (let i = channels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [channels[i], channels[j]] = [channels[j], channels[i]];
    }

    const links: InlineKeyboardButton[][] = channels
      .slice(0, 19)
      .map((channel) => [
        {
          text: channel.title,
          callback_data: channel.title,
          url: channel.link_invite,
        },
      ]);

    links.push([
      {
        text: "PARTICIPAR DA LISTA",
        callback_data: "PARTICIPAR DA LISTA",
        url: "http://t.me/DivulgaLista_Bot",
      },
    ]);

    if (!links) {
      return;
    }

    for (const channel of channels) {
      console.log(`mensagem enviada para o canal: ${channel.title}`);
      await bot.telegram.sendMessage(
        Number(channel.id),
        "Venha conferir os melhores canais aqui!",
        {
          reply_markup: {
            inline_keyboard: links,
            resize_keyboard: true,
          },
        }
      );
    }
  } catch (ex) {
    console.error(ex);
  }
}

const sendMessageTask = (bot: Telegraf) => {
  const jobMoring = new CronJob(
    "00 10 * * *", // cronTime
    function () {
      channelListMessage(bot);
    }, // onTick
    null, // onComplete
    true, // start
    "America/Sao_Paulo" // timeZone
  );

  const jobEvening = new CronJob(
    "00 18 * * *", // cronTime
    function () {
      channelListMessage(bot);
    }, // onTick
    null, // onComplete
    true, // start
    "America/Sao_Paulo" // timeZone
  );

  jobEvening.start();
};

export default sendMessageTask;
