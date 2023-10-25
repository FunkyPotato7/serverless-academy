import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import NodeCache from 'node-cache';

const myCache = new NodeCache();

const token = '6496857479:AAHsfju6zaetseWB3rJXZJh9W46ZLrR-ZrE';
const bot = new TelegramBot(token, { polling: true });

const appid = 'cc6c96f22f373061658e792f58d24078';
const lat = '49.83';
const lon = '24.02';

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`;

let timer = null;

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome', {
        "reply_markup": {
            "keyboard": [['/forecats'], ['/exchange_rate']]
        }
    });
});

bot.onText(/\/forecats/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Here we go!', {
        "reply_markup": {
            "keyboard": [['at intervals of 3 hours', 'at intervals of 6 hours'], ['Back']]
        }
    });
});

bot.onText(/\/exchange_rate/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Choose your currency', {
        "reply_markup": {
            "keyboard": [['USD', 'EUR'],['Back']]
        }
    });
});

bot.on('message', async (msg) => {
    if (msg.text.indexOf('Back') === 0) {
        await bot.sendMessage(msg.chat.id, 'Going back', {
            "reply_markup": {
                "keyboard": [['/forecats'], ['/exchange_rate']]
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

    if (msg.text.indexOf('USD') === 0) {
        await getCurrency();
        await bot.sendMessage(msg.chat.id, `USD currency: \n\n <b>Privat Bank:</b> \t\t<b>Monobank:</b> \n buy: ${myCache.get('privatUSD').buy.slice(0, 5)} \t\t\t\t\t\t\t\tbuy: ${myCache.get('monoUSD').rateBuy} \n sale: ${myCache.get('privatUSD').sale.slice(0, 5)} \t\t\t\t\t\t\t\tsale: ${myCache.get('monoUSD').rateSell.toString().slice(0, 5)}`,{parse_mode : "HTML"});
    }

    if (msg.text.indexOf('EUR') === 0) {
        await getCurrency();
        await bot.sendMessage(msg.chat.id, `EUR currency: \n\n <b>Privat Bank:</b> \t\t<b>Monobank:</b> \n buy: ${myCache.get('privatEUR').buy.slice(0, 5)} \t\t\t\t\t\t\t\tbuy: ${myCache.get('monoEUR').rateBuy} \n sale: ${myCache.get('privatEUR').sale.slice(0, 5)} \t\t\t\t\t\t\t\tsale: ${myCache.get('monoEUR').rateSell.toString().slice(0, 5)}`, {parse_mode: "HTML"});
    }
});

const sendForecast = async (chatId) => {
    const { data } = await axios.get(url);
    await bot.sendMessage(chatId,
        `\tWeather in ${data.city.name}:\n ${data.list.map(el => el.dt_txt.slice(0, 17) + ' ' + el.weather[0].description).join('\n')}`
    );
}

const getCurrency = async () => {
    try {
        const { data: privatData } = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5');
        const { data: monoData } = await axios.get('https://api.monobank.ua/bank/currency');
        myCache.mset([
            { key: "monoUSD", val: monoData[0] },
            { key: "monoEUR", val: monoData[1] },
            { key: "privatUSD", val: privatData[1] },
            { key: "privatEUR", val: privatData[0] },
        ]);
    } catch (e) {
        console.log(e.response.statusText);
    }
}
