import { Router } from "express";
import * as transactionController from "../controllers/transactionController.js";

const transactionRouter = Router();

// Get User's Account Balance
transactionRouter.get("/:userId", transactionController.getBalance);
// Transactions: Deposit and withdraw
transactionRouter.put("/:userId", transactionController.transact);


export default transactionRouter;