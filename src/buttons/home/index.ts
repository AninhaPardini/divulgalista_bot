import { Context, Telegraf } from "telegraf";
import homeMessage from "./message/home.message";

const backToHome = async (bot: Telegraf) => {
  bot.action('🏠 VOLTAR AO MENU PRINCIPAL', async (ctx: Context) => {
    try {
      await ctx.deleteMessage();
    }
    catch (error) {
      console.log('Ocorreu um problema ao deletar a mensagem!'+ error);
    }
    
    homeMessage(ctx);
  });
}

export default backToHome;