import { Context } from "telegraf";

const participarDaLista = async (ctx: Context) => {
  try {
    await ctx.deleteMessage();
  }
  catch (error) {
    console.log('Ocorreu um problema ao deletar a mensagem!'+ error);
  }

  await ctx.replyWithMarkdownV2(
    "✋ *Antes de tudo*\n• Seu canal deve ter pelo menos 100 inscritos para entrar na lista\n\n❓ *Como participar?*\nÉ necessário me adicionar em seu canal e me conceder as seguintes permissões:\n\n✅ Postar Mensagens\n✅ Editar Mensagens de Outros\n✅ Apagar Mensagens de Outros\n✅ Convidar Usuários via Link",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "ADICIONAR CANAL",
              url: "http://t.me/DivulgaLista_Bot?startchannel&admin=post_messages+edit_messages+delete_messages+invite_users+pin_messages+manager_chat",
            },
          ],
          [
            {
              text: "🏠 VOLTAR AO MENU PRINCIPAL",
              callback_data: "🏠 VOLTAR AO MENU PRINCIPAL",
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
};

export default participarDaLista;
