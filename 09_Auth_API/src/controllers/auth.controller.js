import { userService, authService } from  '../services/index.js';
import { authHelper } from '../helpers/index.js';

const authController = {
    signUp: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const hashedPassword = await authHelper.hashPassword(password);

            const { id } = await userService.create(email, hashedPassword);
            const tokens = authService.generateAccessTokenPair({ id });

            res.status(200).json({
                success: true,
                data: {
                    id,
                    ...tokens
                }
            });
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { id } = req.user;

            const tokens = authService.generateAccessTokenPair({ id });

            res.status(200).json({
                success: true,
                data: {
                    id,
                    ...tokens
                }
            });
        } catch (e) {
            next(e);
        }
    }
};

export {
    authController,
};