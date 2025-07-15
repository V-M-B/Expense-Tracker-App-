import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import 'dotenv/config'

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis, // Correct property name
    limiter: Ratelimit.slidingWindow(69, '60 s'),
});

export default ratelimit;