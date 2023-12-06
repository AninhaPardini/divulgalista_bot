import { Context, Telegraf } from "telegraf";


const channelListMessage = async (bot: Telegraf,ctx: Context) => {
  await ctx.deleteMessage();

  // await ctx.reply((ctx) => ctx.reply(''))
}

export default channelListMessage;