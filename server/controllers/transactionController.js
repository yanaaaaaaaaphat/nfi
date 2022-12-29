import { pool } from "../utils/db.js";

export const getBalance = async (req, res) => {
  const userId = req.params.userId;
  const result = await pool.query(
    `SELECT acc_balance FROM users WHERE user_id = $1`,
    [userId]
  );

  return res.json({
    data: result.rows[0].acc_balance.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
};

export const transact = async (req, res) => {
  try {
    const userId = req.params.userId;
    const amount = req.body.amount;

    if (req.body.action == "deposit") {
      await pool.query(
        `UPDATE users SET acc_balance = acc_balance + $1 WHERE user_id = $2`,
        [amount, userId]
      );

      return res.json({
        message: "deposit successfully",
      });
    } else if (req.body.action == "withdraw") {
      const result = await pool.query(
        `SELECT acc_balance FROM users WHERE user_id = $1`,
        [userId]
      );

      await pool.query(
        `UPDATE users SET acc_balance = acc_balance - $1 WHERE user_id = $2`,
        [amount, userId]
      );

      return res.json({
        message: "withdrew successfully",
      });
    }
  } catch (err) {
    return res.json({
      message: err.constraint
    })
  }
};
