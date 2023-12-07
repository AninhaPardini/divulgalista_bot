import "dotenv/config";
import { Context, Telegraf } from "telegraf";
import colectUserInfos from "./middlewares/colect-user-infos";
import Events from "./events";
import { CronJob } from "cron";
import channelsListMessage from "./messages/channels-list.message";

// use `prisma` in your application to read and write data in your DB

const token: string | undefined = process.env.TOKEN;
if (!token) {
  throw new Error('"TOKEN" env var is required!');
}

const bot = new Telegraf(token);

// const jobMoring = new CronJob(
//   "* * 10 * *", // cronTime
//   function () {
//     bot.use(async (ctx, next) => {
//       channelsListMessage(ctx);

//       next();
//     });
//   }, // onTick
//   null, // onComplete
//   true, // start
//   "America/Sao_Paulo" // timeZone
// );

// const jobEvening = new CronJob(
//   "* * 18 * *", // cronTime
//   function () {
//     bot.use(async (ctx, next) => {
//       channelsListMessage(ctx);

//       next();
//     });
//   }, // onTick
//   null, // onComplete
//   true, // start
//   "America/Los_Angeles" // timeZone
// );

bot.telegram.getMe().then((bot) => {
  if (bot.is_bot) {
    console.log(`✅ O bot ${bot.username} com o id ${bot.id} está online!`);
  }
});

colectUserInfos(bot);

Events(bot);

// Start no bot
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));

// default to port 3000 if PORT is not set
const port: number = Number(process.env.PORT) || 3000;

// assert and refuse to start bot if token or webhookDomain is not passed
if (!token) {
  throw new Error('"BOT_TOKEN" env var is required!');
}
// if (!process.env.WEBHOOK_DOMAIN) throw new Error('"WEBHOOK_DOMAIN" env var is required!');

process.once("SIGTERM", () => bot.stop("SIGTERM"));
