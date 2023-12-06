import { prisma } from "../db";

const createChannel = async (
  channelId: number,
  channelTitle: string,
  channelUsername: string,
  inviteLink: string,
  membersCount: number,
  chatId: number
) => {
  await prisma.channel.create({
    data: {
      id: channelId,
      title: channelTitle,
      username: channelUsername,
      link_invite: inviteLink,
      category_id: 1,
      member_count: membersCount,
      user_id: chatId,
    },
  });
};

const updateChannel = async (
  channelId: number,
  channelTitle: string,
  channelUsername: string,
  inviteLink: string,
  membersCount: number,
  chatId: number
) => {
  await prisma.channel.update({
    where: {
      id: channelId,
    },
    data: {
      title: channelTitle,
      username: channelUsername,
      link_invite: inviteLink,
      category_id: 1,
      member_count: membersCount,
    },
  });
};

const deleteChannel = async (chatId: number) => {
  const channels = await prisma.channel.findMany({
    where: {
      user_id: chatId,
    },
  });

  // se o canal não existir, retorne o erro de canal não encontrado e se ele existir, verifique se o user tem mais de um canal, se tiver, delete o canal e se não tiver, delete o user

  if (channels === null || channels === undefined) {
    console.log("Canal não encontrado");
    return;
  }

  await prisma.channel.delete({
    where: {
      user_id: chatId,
    },
  });
};

const upsertChannel = async (
  channelId: number,
  channelTitle: string,
  channelUsername: string,
  inviteLink: string,
  membersCount: number,
  chatId: number
) => {
  await prisma.channel.upsert({
    where: {
      id: channelId,
    },
    update: {
      title: channelTitle,
      username: channelUsername,
      link_invite: inviteLink,
      category_id: 1,
      member_count: membersCount,
    },
    create: {
      id: channelId,
      title: channelTitle,
      username: channelUsername,
      link_invite: inviteLink,
      category_id: 1,
      member_count: membersCount,
      user_id: chatId,
    },
  });
};

export default { createChannel, updateChannel, deleteChannel, upsertChannel };
