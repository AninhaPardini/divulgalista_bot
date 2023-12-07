import channelsListMessage from "src/messages/channels-list.message";
import { Context, Telegraf } from "telegraf";
import { CronJob } from "cron";

const sendMessageTask = (bot: Telegraf) => {

  const jobMoring = new CronJob(
    "* * 10 * *", // cronTime
    function () {
      bot.use(async (ctx, next) => {
        await channelsListMessage(ctx);
        await next();
      });
    }, // onTick
    null, // onComplete
    true, // start
    "America/Sao_Paulo" // timeZone
  );

  const jobEvening = new CronJob(
    "10 18 * * *", // cronTime
    function () {
      bot.use(async (ctx, next) => {
        await channelsListMessage(ctx);
        await next();
      });
    }, // onTick
    null, // onComplete
    true, // start
    "America/Los_Angeles" // timeZone
  );

  jobEvening.start();
}


export default sendMessageTask;
