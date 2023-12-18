import { userService } from '../services/index.js';

const userController = {
    getOneById: async (req, res, next) => {
        try {
            const { id } = req;

            const user = await userService.getById(id);
            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    email: user.email
                }
            });
        } catch (e) {
            next(e);
        }
    }
};

export {
    userController,
};