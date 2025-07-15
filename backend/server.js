import dotenv from "dotenv";
import express from "express";
import sql from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();

// middleware to parse json body>>>>
app.use(express.json());

// ratelimit
app.use(ratelimiter);

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("DB initialized successfully");
    } catch (error) {
        console.error("Error initializing DB:", error);
        process.exit(1);
    }
}

// GET
app.get("/api/transactions/:userId",async(req,res)=>{
    try {
        const {userId}=req.params;
        // console.log(userId);
        
        const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC `

        res.status(200).json(transactions);

    } catch (error) {
        console.log("Error creating transaction",error);
        res.status(500).json({error:"Internal server error"});
    }
})

// CREATE
app.post("/api/transactions",async(req,res)=>{
    try {
        const {user_id,title,amount,category}=req.body;

        if(!user_id || !title || amount === undefined || !category){
          return res.status(400).json({error:"All fields are required"})
        }

        const transaction =await sql`INSERT INTO transactions (user_id,title,amount,category) VALUES (${user_id},${title},${amount},${category}) RETURNING *`;

    console.log(transaction)
        res.status(201).json(transaction);
    } catch (error) {
        console.log("Error creating transaction",error);
        res.status(500).json({error:"Internal server error"});
    }
})

// DELETE
app.delete("/api/transactions/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        if(isNaN(parseInt(id)))
        {
            return res.status(400).json({message:"Invalid transaction ID"})
        }

        const result = await  sql`
        DELETE FROM transactions WHERE id=${id} RETURNING * 
        `
        if(result.length ===0 ){
            return res.status(404).json({message:"Transtion not found"})
        }

        return res.status(200).json(result[0])
        
    } catch (error) {
        console.log("Error deleting transaction",error);
        res.status(500).json({error:"Internal server error"});
    }
})

// 
app.get("/api/transactions/summary/:userId",async(req,res)=>{
    try {
        const {userId}=req.params;

        const balanceResult =await sql`
            SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}
        `
        // income+ expense- amount>0 amount<0 
        const incomeResult = await sql`
        SELECT  COALESCE(SUM(amount),0) as income FROM transactions
        WHERE user_id = ${userId} AND amount > 0
        `
        const expensesResult = await sql`
        SELECT  COALESCE(SUM(amount),0) as expenses FROM transactions
        WHERE user_id = ${userId} AND amount < 0
        `
        res.status(200).json({
            balance:balanceResult[0].balance,  
            income:incomeResult[0].income,  
            expenses:expensesResult[0].expenses,  
        })

    } catch (error) {
        console.log("Error ggetting summary ",error);
        res.status(500).json({error:"Internal server error"});
    }
})

const PORT = process.env.PORT || 3000;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running port", PORT);
    });
});