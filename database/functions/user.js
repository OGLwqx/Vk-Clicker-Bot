const pool = require("../postgresql");

const user = {
  create: async (vk_id) => {
    await pool.query(`INSERT INTO users (vk_id) values ($1)`, [vk_id]);

    return true;
  },
  get: async (vk_id) => {
    const user = await pool.query(`SELECT * FROM users WHERE vk_id = $1`, [
      vk_id,
    ]);

    return user.rows[0];
  },
  applyClick: async (vk_id) => {
    const res = await pool.query(
      `UPDATE users SET balance = balance + level WHERE vk_id = $1 RETURNING *`,
      [vk_id]
    );

    return res.rows[0];
  },

  upgradeLevel: async (vk_id) => {
    await pool.query(
      `UPDATE users SET balance = balance - 100 * level WHERE vk_id = $1`,
      [vk_id]
    );

    const res = await pool.query(
      `UPDATE users SET level = level + 1 WHERE vk_id = $1 RETURNING *`,
      [vk_id]
    );

    return res.rows[0];
  },
};

module.exports = user;
