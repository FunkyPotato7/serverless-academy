import TelegramBot from 'node-telegram-bot-api';
import { Command } from 'commander';
const program = new Command();

const token = '6496857479:AAHsfju6zaetseWB3rJXZJh9W46ZLrR-ZrE';
const chatId = 985844375;

const bot = new TelegramBot(token, { polling: true });

program
    .name('telegram-bot-messages')
    .description('CLI to send messages from TG bot')
    .version('0.0.1')

program
    .command('send-message')
    .description('Send a message to the bot')
    .argument('message...', 'message')
    .action((msg) => {
        bot.sendMessage(chatId, msg.join(' ')).then(() => {
            process.exit(0);
        })
    });

program
    .command('send-photo')
    .description('Send a photo to the bot')
    .argument('path', 'path to file on your PC')
    .action((path) => {
        console.log(path);
        bot.sendPhoto(chatId, path).then(() => {
            console.log('You successfully sent a photo to your bot')
            process.exit(0);
        }).catch((err) => {
            console.log(err.response.body.description);
            process.exit(0);
        });
    });

program.parse();


