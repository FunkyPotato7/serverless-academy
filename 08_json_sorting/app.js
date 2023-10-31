import fs from 'fs';
import axios from 'axios';

const success = [];
const fail = [];
let countTrue = 0;
let countFalse = 0;
let reqTry = 0;

const getData = async (url) => {
    try {
        const { data } = await axios.get(url);
        getIsDone(data, url);
    } catch (e) {
        if (reqTry < 3){
            reqTry++;
            await getData(url);
        } else {
            fail.push(`[Fail] ${url}: The endpoint is unavailable`);
        }
    }

};

const getIsDone = (obj, url) => {
    for (const key in obj) {
        if (key === 'isDone') {
            success.push(`[Success] ${url}: isDone - ${obj[key]}`);
            if (obj[key]) {
                countTrue++;
            } else {
                countFalse++;
            }
        } else if (typeof obj[key] === 'object') {
            getIsDone(obj[key], url);
        }
    }
}

fs.readFile('urls.txt', async (err, data) => {
    const urls = data.toString().split('\r\n');
    for (const url of urls) {
        await getData(url);
    }

    console.log(success.join('\n'));
    console.log(fail.join('\n'));
    console.log(`\nFound True values: ${countTrue},\nFound False values: ${countFalse}`);
});

