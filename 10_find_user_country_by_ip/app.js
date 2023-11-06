import express from 'express';
import fs from 'fs';
import { IPTools } from 'ip2location-nodejs';

const app = express();

const tools = new IPTools();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getCountryInfo', (req, res) => {
    const { ip } = req;
    const location = tools.ipV4ToDecimal(ip);

    fs.readFile('IP2LOCATION-LITE-DB1.CSV', (err, data) => {
         const parsedData = data.toString().split('\r\n').map(el => el.replace(/"/g, '').split(','));

         for (const arr of parsedData) {
             if (location >= Number(arr[0]) && location <= Number(arr[1])) {
                 res.status(200).json({
                     ip,
                     rangeStart: tools.decimalToIPV4(arr[0]),
                     rangeEnd: tools.decimalToIPV4(arr[1]),
                     country: arr[3]
                 });
             }
         }
     });
});

app.listen(5000, () => {
    console.log('Server listen 5000');
});
