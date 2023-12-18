import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { access, refresh } from '../enums/tokenTypes.enum.js';
import { APIError } from '../errors/APIError.js';

console.log(process.env.ACCESS_KEY);
const authService = {
    generateAccessTokenPair: (dataToSign = {}) => {
        try {
            const accessToken = jwt.sign(dataToSign, process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_EXPIRES_IN });
            const refreshToken = jwt.sign(dataToSign, process.env.REFRESH_KEY, {});

            return {
                accessToken,
                refreshToken
            }
        } catch (e) {
            throw new APIError('Internal Server Error', 500);
        }

    },

    checkTokens: (token, tokenType = access) => {
        try {
            let key = '';

            if (tokenType === access) key = process.env.ACCESS_KEY;
            else if (tokenType === refresh) key = process.env.REFRESH_KEY;

            return jwt.verify(token, key);
        } catch (e) {
            throw new APIError('Access token not valid', 401);
        }
    }
};

export {
    authService,
};