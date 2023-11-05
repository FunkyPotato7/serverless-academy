const pool = require('../db/pg');

module.exports = {
    getById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    },

    getOne: async (email) => {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    },

    create: async (email, password) => {
        const { rows } = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
        return rows[0];
    }
}