import express from 'express';
import fs from 'fs';

import APIError from './errors/APIError.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:json_path', async (req, res, next) => {
    const { json_path } = req.params;

    fs.readFile(`./files/${json_path}.json`, (err, data) => {
        try {
            if (err) {
                throw new APIError(`File ${json_path} not exist`, 404);
            }
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        } catch (e) {
            next(e);
        }
    });
});

app.put('/:json_path', (req, res, next) => {
    const { body, params } = req;

    const jsonData = JSON.stringify(body);

    fs.writeFile(`./filejs/${params.json_path}.json`, jsonData, (err) => {
        try {
            if (err) {
                throw new APIError(err.message, 404);
            }
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
});

app.listen(5000, () => {
    console.log(`Server listen 5000`);
});