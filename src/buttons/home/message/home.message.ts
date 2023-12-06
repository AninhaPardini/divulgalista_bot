import { Context } from "telegraf";

const homeMessage = async (ctx: Context) => {
  const userName: string = ctx.from?.first_name || '';

  await ctx.replyWithPhoto(

    'https://github.com/AninhaPardini/Canais--Trabalho-/blob/main/banner-home.png?raw=true', {
      caption: `👋 Olá ${userName}! Valeu por inciar uma conversa comigo :)\n Escolha a opção que deseja:`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'CANAIS DIVULGADOS POR CATEGORIA', callback_data: 'CANAIS DIVULGADOS POR CATEGORIA' }
          ],
          [
            { text: 'PARTICIPAR DA LISTA', callback_data: 'PARTICIPAR DA LISTA' }
          ],
          [
            { text: 'MAIS INFOS', callback_data: 'MAIS INFOS' }
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    }
    
  );
};

export default homeMessage;