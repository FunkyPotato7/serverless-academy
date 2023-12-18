import pool from '../db/pg.js';

const userService = {
    getById: async (id) => {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return rows[0];
        } catch (e) {
            console.log(e);
        }
    },

    getOne: async (email) => {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return rows[0];
        } catch (e) {
            console.log(e);
        }

    },

    create: async (email, password) => {
        const { rows } = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
        return rows[0];
    }
};

export {
    userService,
};