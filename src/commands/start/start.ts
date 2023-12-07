import { Telegraf } from "telegraf";
import homeMessage from "../../buttons/home/message/home.message";

const startMessage = async (bot: Telegraf) => {
  
  bot.start(async (ctx) => {
    console.log(ctx);
    homeMessage(ctx);

  });


};

export default startMessage;