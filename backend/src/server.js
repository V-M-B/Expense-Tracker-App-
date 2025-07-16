import dotenv from "dotenv";
import express from "express";
import sql from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

import transactionRoute from "./routes/transactionsRoute.js"

const app = express();

if(process.env.NODE_ENV === "production") JsonObjKeysCommand.start();

// middleware to parse json body>>>>
app.use(express.json());

// ratelimit
app.use(ratelimiter);

app.use("/api/transactions",transactionRoute)

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



const PORT = process.env.PORT || 3000;

app.get("/api/health",(req,res)=>{
    res.status(200).json({status:"ok"})
})


initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running port", PORT);
    });
});