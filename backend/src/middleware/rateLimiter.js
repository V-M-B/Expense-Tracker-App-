import ratelimit from "../config/upstash.js"

const ratelimiter = async (req,res,next)=>{
    try {
        // here we just keep it simple.
        // in a real-world-app you'd like to put the userId or ip Address as your key 
        const {success} = await ratelimit.limit("my-rate-limit")
        if(!success){
            return res.status(429).json({
                message:"Too many request, Please try agian later " 
            })
        }
        next();

    } catch (error) {
        console.log("rate limit error ",error)
        next(error)
    }
}

export default ratelimiter;