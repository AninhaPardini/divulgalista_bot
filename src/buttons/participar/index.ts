import { Context, Telegraf } from 'telegraf';
import participar from './message/participar';

const participarLista = async (bot: Telegraf) => {
  bot.action('PARTICIPAR DA LISTA', async (ctx: Context) => {
    participar(ctx);

  });

}

export default participarLista;