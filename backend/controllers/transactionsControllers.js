import sql from "../config/db.js";

//get
export async function getTransactionsByUserId(req, res){
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
}

// create post
export async function createTransactionsByUserId(req, res){
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
}

// DELETE by id
export async function deleteTransactionsByUserId(req, res){
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid transaction ID" });
        }
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;
        if (result.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.log("Error deleting transaction", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// summary
export async function summaryTransactionsByUserId(req, res){
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
}


