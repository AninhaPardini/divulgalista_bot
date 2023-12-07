import channelsListMessage from "src/messages/channels-list.message";
import { Context, Telegraf } from "telegraf";
import { CronJob } from "cron";

const sendMessage = async (bot: Telegraf) => {
  bot.use(async (ctx, next) => {
    channelsListMessage(ctx);
    await next();
  });
  
}

const jobMoring = new CronJob(
  "* * 10 * *", // cronTime
  function () {
    

  }, // onTick
  null, // onComplete
  true, // start
  "America/Sao_Paulo" // timeZone
);

const jobEvening = new CronJob(
  "* * 18 * *", // cronTime
  function () {
    channelsListMessage(ctx);

  }, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles" // timeZone
);

module.exports = 
  jobMoring