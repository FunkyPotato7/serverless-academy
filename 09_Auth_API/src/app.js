const express = require('express');
require('dotenv').config();

const { userRouter, authRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/me', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listen on ${process.env.PORT}`);
});