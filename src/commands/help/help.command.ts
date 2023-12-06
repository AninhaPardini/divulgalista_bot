import { Context, Telegraf } from "telegraf";

/**
 * Esta função envia uma lista de mensagens de canais.
 * @author Aninha Pardini
 * @param {Object} bot - O bot que está enviando a mensagem.
 * @returns {Promise<void>} Uma promessa que resolve quando a mensagem é enviada.
 * @description Mensagem que contém informações de ajuda do bot;
 * @since 1.0.0
 */
const helpMessage = async (bot: Telegraf): Promise<void> => {

  bot.help(async (ctx: Context) => {

    await ctx.reply(
      'Manual de como usar o @DivulgaCanais\n\n'
    );
  });
};

export default helpMessage;