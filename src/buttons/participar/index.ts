import { Context, Telegraf } from 'telegraf';
import participarDaLista from './message/participar';

const participarLista = async (bot: Telegraf) => {
  bot.action('PARTICIPAR DA LISTA', (ctx: Context) => {
    const userId = ctx.from?.id; // Pegar o id do usuário que clicou no botão
    participarDaLista(ctx);

  });

  

  // Adicionar canal não tem interassão capitada.
}

export default participarLista;