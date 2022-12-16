import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register

export const register = async (req, res) => {
  try {
    const newUser = { ...req.body };

    // check if this email already exists in the database
    const userExist = await pool.query(
      `select email from users where email ilike $1`,
      [newUser.email]
    );

    if (userExist.rowCount != 0) {
      return res.json({
        message: "This email has already been taken.",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);

      await pool.query(
        `insert into users (full_name, email, password)
        values ($1, $2, $3)`,
        [newUser.full_name, newUser.email, newUser.password]
      );

      return res.json({
        message: "Registered successfully",
      });
    }
  } catch (err) {
    return res.sendStatus(500);
  }
};

// log in

export const login = async (req, res) => {
  // try {
  
    const loginInfo = { ...req.body };
    const user = await pool.query(`select * from users where email ilike $1 `, [
      loginInfo.email,
    ]);

    if (user.rowCount === 0) {
      return res.json({
        message: "Couldn't find your account",
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginInfo.password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.json({
        message: "Wrong password. Please try again.",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.rows[0].user_id,
        email: user.rows[0].email,
        full_name: user.rows[0].full_name
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3600000",
      }
    );

    return res.json({
      message: "Login successfully",
      token,
    });
  // } catch (error) {
  //   return res.sendStatus(500);
  // }
  
};
