import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";

//WOW WHAT IS THAT
//import { authRouter, userRouter } from './routers/index.js';

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

//TEST
//TEST
//TEST