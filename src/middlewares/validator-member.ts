import { Context } from "telegraf";
import { prisma } from "../db";
import channelsService from "../service/channels-service";

const validatorMember = async (ctx: Context, botId: number, chatId: number) => {
  try {
    const member = await ctx.getChatMember(botId);

    if (member.status === "kicked" || member.status === "left") {
      try {
        const channel = await prisma.channel.findMany({
          where: {
            user_id: chatId,
          },
        });
        console.log(`${channel}`);
        if (channel.length === 0) {
          console.log("Não encontrei o canal");
          return;
        }

        channelsService.deleteChannel(chatId);
      } catch (error) {
        console.log(`Não consegui interação com o canal. error: ${error}`);
      }
    }

    if (!member || typeof member !== "object" || member === undefined) {
      ctx.reply("Você precisa me adicionar no seu canal!");
      throw new Error("Membro inválido");
    }

    member;
  } catch (error) {
    console.log(`Não consegui interação com o canal. error: ${error}`);
  }
};

export default validatorMember;
