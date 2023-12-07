import { prisma } from "../db";

const getChatIDs = async (): Promise<number[]> => {
  const channels = await prisma.channel.findMany();
  return channels.map((channel) => Number(channel.id));
};

const getRandomChannels = async (): Promise<string[][]> => {
  const channels = await prisma.channel.findMany({
    take: 19,
    orderBy: {
      id: "asc",
    },
  });

  // Embaralha o array
  for (let i = channels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [channels[i], channels[j]] = [channels[j], channels[i]];
  }

  return channels.map((channel) => [channel.title, channel.link_invite]);
};

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
  try {

    await prisma.channel.delete({
      where: {
        id: chatId,
      },
    });

  } catch (error) {
    console.log(`Não consegui interação com o canal. error: ${error}`);
  }

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

export default {
  createChannel,
  updateChannel,
  deleteChannel,
  upsertChannel,
  getChatIDs,
  getRandomChannels,
};
