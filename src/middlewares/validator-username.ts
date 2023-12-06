import { Context } from "telegraf";

const validatorUsername = (ctx:Context) => {
    const username = ctx.from?.first_name;
    if (!username || typeof username !== 'string' || username === undefined) {
        console.log('Username inválido');
        throw new Error('Username inválido');
    }
    return username;
}

export default validatorUsername;