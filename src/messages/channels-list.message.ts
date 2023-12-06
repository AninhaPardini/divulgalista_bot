import { Context, Telegraf } from "telegraf";
import { prisma } from "../db";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";

/**
 * Esta função envia uma lista de mensagens de canais.
 *
 * @param {Object} ctx - O Contexto da mensagem.
 * @returns {Promise<void>} Uma promessa que resolve quando a mensagem é enviada.
 * @description Mensagem que contém a lista de canais e suas categorias e tem o intuito de ser incluída a função de disparo nos canais;
 * @see {}
 * @since 1.0.0
 */
const channelListMessage = async (ctx: Context) => {
  const getRandomChannels = async () => {
    const channels = await prisma.channel.findMany({
      take: 19,
      orderBy: {
        id: "asc",
      },
    });

    // Embaralha o array
    for (let i = channels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [channels[i], channels[j]] = [channels[j], channels[i]];
    }

    return channels;
  };

  const channels = await getRandomChannels().then((channels) => {
    let channelsList: InlineKeyboardButton[][] = [];
    for (let i = 0; i < channels.length; i++) {
      channelsList.push([
        {
          text: `${channels[i].title}`,
          callback_data: `${channels[i].title}`,
          url: `${channels[i].link_invite}`,
        },
      ]);
    }

    channelsList.push([
      {
        text: "PARTICIPAR DA LISTA",
        url: "http://t.me/DivulgaLista_Bot",
      },
    ]);

    return channelsList;
  });
  if (!channels) {
    return;
  }

  return await ctx.reply("Venha conferir os melhores canais aqui!", {
    reply_markup: {
      inline_keyboard: channels,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
};

export default channelListMessage;
