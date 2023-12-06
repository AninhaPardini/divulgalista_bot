import { Context, Telegraf } from 'telegraf';
import categoriesBranches from './messages/categories-branches';
import generalListCategory from './messages/general/general-category-list';
import negociosReply from './messages/general/negocios-reply';
import diversosReply from './messages/general/diversos-reply';
import entretenimentoReply from './messages/general/entretenimento-reply';
import estudosReply from './messages/general/estudos-reply';
import tecnologiaReply from './messages/general/tecnologias-reply';
import moreEighteenCategory from './messages/nfsw/more-eighteen';

const canaisCategorias = (bot: Telegraf) => {
  bot.action('CANAIS DIVULGADOS POR CATEGORIA', (ctx: Context) => {
    categoriesBranches(ctx);
  });

  bot.action('GERAL', async (ctx: Context) => {
    generalListCategory(ctx);
  });

  bot.action('+18', async (ctx: Context) => {
    moreEighteenCategory(ctx);
  });

  bot.action('NEGÓCIOS', async (ctx: Context) => {
    negociosReply(ctx);
  });

  bot.action('DIVERSOS', async (ctx: Context) => {
    diversosReply(ctx);
  });

  bot.action('ENTRETENIMENTO', async (ctx: Context) => {
    entretenimentoReply(ctx);
  });

  bot.action('ESTUDOS', async (ctx: Context) => {
    estudosReply(ctx);
  });

  bot.action('TECNOLOGIA', async (ctx: Context) => {
    tecnologiaReply(ctx);
  });

}

export default canaisCategorias;