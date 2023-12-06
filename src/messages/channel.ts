import { Context, Telegraf } from "telegraf";
import { prisma } from "../db";
import validatorUsername from "../middlewares/validator-username";
import validatorChatId from "../middlewares/validator-chat-id";
import channelsService from "../service/channels-service";
import channelListMessage from "./channels-list.message";


const colectData = async (ctx: Context, bot: Telegraf, userId: number) => {
  const botId: number = 6937764087;
  const chatId = ctx.message?.chat.id;
  const userUsername = ctx.from?.username;

  if (chatId === undefined) {
    return;
  }

  if (userUsername === undefined) {
    return;
  }

  const chatInfo = await ctx.telegram.getChat(chatId);

  const isPrivateChannel: boolean | undefined = chatInfo.has_protected_content;
  if (isPrivateChannel === true) {
    return ctx.reply("Você precisa ter um canal público para estar na lista!");
  }

  // Verificar se o chat é um canal
  if (chatInfo.type != "channel") {
    return;
  }

  const membersCount = await ctx.getChatMembersCount();
  console.log(membersCount);

  if (process.env.NODE_ENV === "production" && membersCount < 100) {
    return ctx.reply(
      "Você precisa ter pelo menos 100 membros no canal para estar na lista!"
    );
  }

  const channelTitle: string = chatInfo.title;
  let hasInvite: string | undefined = chatInfo.invite_link;
  if (!hasInvite) {
    return;
  }
  const inviteLink: string = hasInvite;
  let hasChannelUsername: string | undefined = chatInfo.username;
  if (!hasChannelUsername) {
    return (hasChannelUsername = "n/a");
  }
  const channelUsername = hasChannelUsername;

  await prisma.user.upsert({
    where: {
      id: userId,
    },
    update: {
      username: userUsername,
    },
    create: {
      id: userId,
      username: userUsername,
    },
  });

  channelsService.upsertChannel(
    chatId,
    channelTitle,
    channelUsername,
    inviteLink,
    membersCount,
    userId
  );

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

export default colectData;
