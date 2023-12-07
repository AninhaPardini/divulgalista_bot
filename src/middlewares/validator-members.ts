import { Context } from "telegraf";

const isValidChannelMember = async (members: number, ctx: Context) => {
  if(process.env.NODE_ENV === "production" && members < 100) {
    await ctx.reply('❌ O servidor não tem membros suficientes para entrar na lista, é necessário 100 membros ou mais.');

    return false;
  }

  return true;
}

export default isValidChannelMember;