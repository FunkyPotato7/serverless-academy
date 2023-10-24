import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const token = '6496857479:AAHsfju6zaetseWB3rJXZJh9W46ZLrR-ZrE';
const bot = new TelegramBot(token, { polling: true });

const appid = 'cc6c96f22f373061658e792f58d24078';
const lat = '49.83';
const lon = '24.02';

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`;

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, 'Welcome', {
        "reply_markup": {
            "keyboard": [['Forecast in Lviv']]
        }
    });

});

let timer = null;

bot.on('message', async (msg) => {
    if (msg.text.indexOf('Forecast in Lviv') === 0) {
         await bot.sendMessage(msg.chat.id, 'Here we go!', {
            "reply_markup": {
                "keyboard": [['at intervals of 3 hours'], ['at intervals of 6 hours']]
            }
        });
    }

    if (msg.text.indexOf('at intervals of 3 hours') === 0) {
        await sendForecast(msg.chat.id);
        clearInterval(timer);
        timer = setInterval(async () => {
            await sendForecast(msg.chat.id);
        }, 10800000);
    }

    if (msg.text.indexOf('at intervals of 6 hours') === 0) {
        await sendForecast(msg.chat.id);
        clearInterval(timer);
        timer = setInterval(async () => {
            await sendForecast(msg.chat.id);
        }, 21600000);
    }
});

const sendForecast = async (chatId) => {
    const { data } = await axios.get(url);
    await bot.sendMessage(chatId,
        `\tWeather in ${data.city.name}:\n ${data.list.map(el => el.dt_txt.slice(0, 17) + ' ' + el.weather[0].description).join('\n')}`
    );
}
