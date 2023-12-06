import { Context, Telegraf } from "telegraf";
import infosMessage from "./message/more-infos.message";


const infos = async (bot: Telegraf) => {
  bot.action('MAIS INFOS', async (ctx: Context) => {
    infosMessage(ctx);
  });
}

export default infos;