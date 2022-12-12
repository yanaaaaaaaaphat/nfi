import { pool } from "../utils/db.js";

export const getBalance = async (req, res) => {
    const userId = req.params.userId;
    const result = await pool.query(`SELECT acc_balance FROM users WHERE user_id = $1`, [userId]);

    return res.json({
        data: result.rows[0].acc_balance.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    })
}

export const deposit = async (req, res) => {
    const userId = req.params.userId;
    const depositAmount = req.body.amount;
    await pool.query(`UPDATE users SET acc_balance = $1 WHERE user_id = $2`,
    [depositAmount, userId]);
}


// withdraw if acc_balance not negative
