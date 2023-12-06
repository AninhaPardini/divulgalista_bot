import { Context } from "telegraf";

const infosMessage = async (ctx:Context) => {
  try {
    await ctx.deleteMessage();
    
  }
  catch (error) {
    console.log('Ocorreu um problema ao deletar a mensagem!'+ error);
  }

  await ctx.replyWithMarkdownV2(
    'Manual de como usar o @DivulgaLista_Bot',
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🏠 VOLTAR AO MENU PRINCIPAL', callback_data: '🏠 VOLTAR AO MENU PRINCIPAL' }
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      },
    }
  );
  
}

export default infosMessage;