import bcrypt from 'bcrypt';

const authHelper = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        if (!password || !hashPassword) {
            throw new Error('Password is not provided');
        }

        return await bcrypt.compare(password, hashPassword)
    }
};

export {
    authHelper,
};