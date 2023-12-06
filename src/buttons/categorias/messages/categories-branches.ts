import { Context } from "telegraf";

const categoriesBranches = async (ctx: Context) => {
  try {
    await ctx.deleteMessage();
  }
  catch (error) {
    console.log('Ocorreu um problema no envio da mensagem!'+ error);
  }

  await ctx.replyWithMarkdownV2('Uma lista com dois botões', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'GERAL', callback_data: 'GERAL' },
          { text: '+18', callback_data: '+18' }
        ],
        [
          { text: '🏠 VOLTAR AO MENU PRINCIPAL', callback_data: '🏠 VOLTAR AO MENU PRINCIPAL' }
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });

}

export default categoriesBranches;