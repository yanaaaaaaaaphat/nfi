import { Router } from "express";
import * as transactionController from "../controllers/transactionController.js";

const transactionRouter = Router();

// Get User's Account Balance
transactionRouter.get("/:userId", transactionController.getBalance);
// Deposit
// transactionRouter.put("/:userId", transactionController.deposit);

// // Withdraw
// transactionRouter.put("/withdraw", transactionController.withdraw);

export default transactionRouter;