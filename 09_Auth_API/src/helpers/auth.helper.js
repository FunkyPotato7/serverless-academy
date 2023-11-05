const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        if (!password || !hashPassword) {
            throw new Error('Password is not provided');
        }

        return await bcrypt.compare(password, hashPassword)
    }
}