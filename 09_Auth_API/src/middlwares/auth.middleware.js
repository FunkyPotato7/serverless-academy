import { userService, authService } from '../services/index.js';
import { authHelper } from '../helpers/index.js';
import { authValidator } from '../validators/index.js';
import { APIError } from '../errors/APIError.js';

const authMiddleware = {
    checkSignUpBody: async (req, res, next) => {
        try {
            const { error, value } = await authValidator.validate(req.body);

            if (error) {
                throw new APIError(error.message, 400);
            }

            const user = await userService.getOne(value.email);

            if (user) {
                throw new APIError('User with this email already exist', 400);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkSignInBody: async (req, res, next) => {
        try {
            const { error, value } = await authValidator.validate(req.body);

            if (error) {
                throw new APIError(error.message, 400);
            }

            const user = await userService.getOne(value.email);
            console.log(user);
            if (!user) {
                throw new APIError('Wrong email or password', 400);
            }

            const isPasswordSame = await authHelper.comparePasswords(value.password, user.password);
            if (!isPasswordSame) {
                throw new APIError('Wrong email or password', 400);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization').split(' ')[1];

            if (!accessToken) {
                throw new APIError('Access token was not provided', 401);
            }

            const { id } = authService.checkTokens(accessToken);

            req.id = id;
            next();
        } catch (e) {
            next(e);
        }
    }
};

export {
    authMiddleware,
};