const { 
    Telegraf, 
    Markup 
} = require('telegraf');
require('dotenv').config();
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`));
bot.help((ctx) => ctx.reply(text.commands));
bot.command('course', async (ctx) => {
    try{
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2'), Markup.button.callback('JS', 'btn_3')],
                [Markup.button.callback('HTML', 'btn_4')]
            ]
        ));
    }
    catch(e){
        console.error(e);
    }
});

bot.action('btn_1', async (ctx) => {
    try{
        await ctx.answerCbQuery();
        await ctx.replyWithHTML('Обработка кнопки 1', {
            disable_web_page_preview: true
        });
    } catch(e){
        console.error(e);
    }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));