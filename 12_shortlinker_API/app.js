import express from 'express';

import APIError from './errors/APIError.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataBase = {};

app.post('/shortUrl', (req, res, next) => {
    try {
        const { url } = req.body;

        if (!url) {
            throw new APIError('URL not presented', 400);
        }

        if (!url.includes('https://') && !url.includes('http://')) {
            throw new APIError('Invalid URL', 400);
        }

        const urlId = (Math.random() + 1).toString(36).substring(7);
        const shortURL = `http://localhost:5000/${urlId}`;
        dataBase[urlId] = url;

        res.json({
            success: true,
            shortURL,
        });
    } catch (e) {
        next(e);
    }
});

app.get('/:shortUrl', (req, res, next) => {
    try {
        const { shortUrl } = req.params;
        const url = dataBase[shortUrl];

        if (!url) {
            throw new APIError('Invalid URL', 400);
        }

        res.redirect(url);
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
});

app.listen(5000, () => {
    console.log('Server listen 5000');
});