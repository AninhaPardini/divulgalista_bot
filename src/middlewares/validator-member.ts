import { Context } from "telegraf";
import { prisma } from "../db";
import channelsService from "../service/channels-service";

const validatorMember = async (ctx: Context, botId: number, chatId: number) => {
  try {
    const member = await ctx.getChatMember(botId);

    if (member.status === "kicked" || member.status === "left") {
      
      try {

        channelsService.deleteChannel(chatId);
      } catch (error) {
        console.log(`Não consegui interação com o canal. error: ${error}`);
      }
    }

  } catch (error) {
    console.log(`Não consegui acessar o member. Error: ${error}`);
  }
};

export default validatorMember;
