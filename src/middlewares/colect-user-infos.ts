import { Telegraf } from "telegraf";
import validatorChatId from "./validator-chat-id";
import validatorMember from "./validator-member";
import colectFilter from "src/middlewares/channels-filter";

const colectUserInfos = async (bot: Telegraf) => {
  bot.use(async (ctx, next) => {
    const botId = ctx.botInfo?.id;

    const hasUserId = ctx.from?.id;
    if (hasUserId === undefined) {
      return;
    }
    const userId = hasUserId;
    const userName = ctx.from?.username;
    const firstName = ctx.from?.first_name;
    const lastName = ctx.from?.last_name;
    const userLanguage = ctx.from?.language_code;
    const userChatId = ctx.message?.chat.id;
    const userChatType = ctx.message?.chat.type;
    const userDate = ctx.message?.date;
    const chatId = validatorChatId(ctx);
    if (chatId === undefined) {
      return;
    }

    console.log(userId);
    console.log(userName);
    console.log(firstName);
    console.log(lastName);
    console.log(userLanguage);
    console.log(userChatId);

    colectFilter(ctx, userId, userName, chatId);

    next();
  });
};

export default colectUserInfos;
