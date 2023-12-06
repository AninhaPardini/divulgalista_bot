import { Context } from "telegraf";
import { prisma } from "../../../../db";
import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
} from "telegraf/typings/core/types/typegram";

/**
 * Esta função envia uma lista de mensagens de canais.
 *
 * @param {Object} ctx - O Contexto da mensagem.
 * @returns {Promise<void>} Uma promessa que resolve quando a mensagem é enviada.
 * @description Mensagem que contém a lista de canais e suas categorias e tem o intuito de ser incluída a função de disparo nos canais;
 * @see {}
 * @since 1.0.0
 */
const generalListCategory = async (ctx: Context): Promise<void> => {
  async function getRandomChannels() {
    const categories = await prisma.category.findMany({
      where: {
        // Verifica se a categoriaId não é nula e é diferente de 6
        id: {
          not: 6,
        },
      },
      select: {
        name: true,
      },
    });

    console.log(categories);

    return categories;
  }

  const categories = await getRandomChannels().then((categories) => {
    let categoriesList: InlineKeyboardButton[][] = [];
    for (let i = 0; i < categories.length; i++) {
      categoriesList.push([
        {
          text: `${categories[i].name}`,
          callback_data: `${categories[i].name}`,
        },
      ]);
    }

    categoriesList.push([
      {
        text: "🏠 VOLTAR AO MENU PRINCIPAL",
        callback_data: "🏠 VOLTAR AO MENU PRINCIPAL",
      },
    ]);

    return categoriesList;
  });
  if (!categories) {
    return;
  }

  try {
    await ctx.deleteMessage();
  } catch (error) {
    console.log("Ocorreu um problema ao deletar a mensagem!" + error);
  }

  await ctx.reply("Confira a lista das categorias que temos:", {
    reply_markup: {
      // como eu faço aqui?
      inline_keyboard: categories,
    },
  });
};

export default generalListCategory;
