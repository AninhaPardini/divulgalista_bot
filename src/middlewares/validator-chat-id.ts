import { Context } from "telegraf";

const validatorChatId = (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId || typeof chatId !== 'number' || chatId === undefined) {
    console.log('ID de chat inválido');
    throw new Error('ID de chat inválido');
  }

  return chatId;

}

export default validatorChatId;