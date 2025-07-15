import express from "express"
import sql from "../config/db.js"

const router =  express.Router();

import {getTransactionsByUserId,createTransactionsByUserId,deleteTransactionsByUserId,summaryTransactionsByUserId} from "../controllers/transactionsControllers.js"

// GET
router.get("/:userId",getTransactionsByUserId)

// CREATE
router.post("",createTransactionsByUserId)

// DELETE
router.delete("/:id",deleteTransactionsByUserId)
// summary
router.get("/summary/:userId",summaryTransactionsByUserId)

export default router;