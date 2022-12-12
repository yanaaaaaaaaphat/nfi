import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import transactionRouter from "./routes/transaction.js";
import authRouter from "./routes/auth.js"


async function init() {
  dotenv.config();

  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/transact", transactionRouter);
  app.use("/auth", authRouter);

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();