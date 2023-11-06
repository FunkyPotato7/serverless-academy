import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:json_path', async (req, res) => {
    const { json_path } = req.params;

    await fs.readFile(`./files/${json_path}.json`, (err, data) => {
        if (data) {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        } else {
            res.status(404).json(`File ${json_path} not exist`);
        }
    });
});

app.put('/:json_path', (req, res) => {
    const { body, params } = req;
    const jsonData = JSON.stringify(body);

    fs.writeFile(`./files/${params.json_path}.json`, jsonData, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.sendStatus(200);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});

app.listen(5000, () => {
    console.log(`Server listen 5000`);
});