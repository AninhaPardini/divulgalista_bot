import { Telegraf } from "telegraf";
import canaisCategorias from "./buttons/categorias";
import startMessage from "./commands/start/start";
import backToHome from "./buttons/home";
import infos from "./buttons/infos";
import addChannels from "./buttons/channels";
import helpMessage from "./commands/help/help";
import participarDaLista from "./buttons/participar";

const Events = (bot: Telegraf) => {
  startMessage(bot);

  canaisCategorias(bot);

  backToHome(bot);

  infos(bot);

  addChannels(bot);

  helpMessage(bot);

  participarDaLista(bot);

  // Tratamento de erros

  bot.catch((err, ctx) => {
    console.log(`Ooops, ocorreu um erro para o usuário ${ctx.from?.id}: `, err);
  });
}

export default Events;