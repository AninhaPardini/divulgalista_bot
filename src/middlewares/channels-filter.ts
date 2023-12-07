import { Context } from "telegraf";
import { prisma } from "../db";
import channelsService from "../service/channels-service";
import channelListMessage from "../messages/channels-list.message";
import validatorMember from "src/middlewares/validator-member";
import isValidChannelMember from "src/middlewares/validator-members";

const colectFilter = async (ctx: Context, userId: number, userName: string, chatId: number) => {

  const botId = ctx.botInfo?.id;

  if (chatId === undefined) {
    
    return;
  }

  validatorMember(ctx, botId, chatId);

  if (userName === undefined) {
    ctx.reply( "Você precisa ter um username para estar na lista!");

    return;
  }

  const chatInfo = await ctx.telegram.getChat(chatId);

  const isPrivateChannel: boolean | undefined = chatInfo.has_protected_content;
  if (isPrivateChannel === true) {
    ctx.reply("Você precisa ter um canal público para estar na lista!");

    return;
  }

  // Verificar se o chat é um canal
  if (chatInfo.type != "channel") {

    return;
  }

  const membersCount = await ctx.getChatMembersCount();
  console.log(membersCount);

  const isValid = await isValidChannelMember(membersCount, ctx);
  if (!isValid) {
    return;
  }

  const channelTitle: string = chatInfo.title;
  let hasInvite: string | undefined = chatInfo.invite_link;
  if (!hasInvite) {
    (hasInvite = "n/a");

    return;
  }
  const inviteLink: string = hasInvite;
  let hasChannelUsername: string | undefined = chatInfo.username;
  if (!hasChannelUsername) {
    (hasChannelUsername = "n/a");

    return;
  }
  const channelUsername = hasChannelUsername;

  try {
    const channelExists = await prisma.channel.findUnique({
      where: {
        id: chatId,
      },
    });
    if (channelExists) {
      ctx.reply(
        "Esse canal já está na lista! Caso queira atualizar as informações, entre em contato com o @DivulgaLista_Bot!"
      );

      return;
    }
  } catch (error) {
    console.error(error);
  }

  try {
    await prisma.user.upsert({
    where: {
      id: userId,
    },
    update: {
      username: userName,
    },
    create: {
      id: userId,
      username: userName,
    },
  });
  } catch (error) {
    console.error('Erro ao adicionar usuario no banco de dados' + error);
  }

  try{
    channelsService.upsertChannel(
    chatId,
    channelTitle,
    channelUsername,
    inviteLink,
    membersCount,
    userId
  );
  } catch (error) {
    console.error('Erro ao adicionar canal no banco de dados' + error);
  }
  

  // await prisma.channel.upsert({
  //   where: {
  //     id: chatId,
  //   },
  //   update: {
  //     title: channelTitle,
  //     username: channelUsername,
  //     link_invite: inviteLink,
  //     category_id: 1,
  //     member_count: membersCount,
  //   },
  //   create: {
  //     id: chatId,
  //     title: channelTitle,
  //     username: channelUsername,
  //     link_invite: inviteLink,
  //     category_id: 1,
  //     member_count: membersCount,
  //     user_id: chatId,
  //   },
  // });

  ctx.reply(
    `Bem-vindos(as) ${channelTitle}! Agora vocês estão participando da lista!`
  );

  channelListMessage(ctx);
};

export default colectFilter;
