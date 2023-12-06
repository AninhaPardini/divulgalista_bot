import { Context } from "telegraf";

const isValidChannelMember = (members: number, ctx: Context) => {
  if(members < 100) {
    ctx.reply('❌ O servidor não tem membros suficientes para entrar na lista, é necessário 100 membros ou mais.')

    throw new Error('Canal não está dentro do minímo requerido para entrar na lista.');

  }
}

export default isValidChannelMember;