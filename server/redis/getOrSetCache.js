const redisClient = require("./client");

async function getOrSetCache(key, cb) {
    const data = await redisClient.get(key);
    if(data) {
        console.log("cache hit");
        return data;
    }
    console.log("cache miss");
    const freshData = await cb();
    redisClient.set(key, freshData);
    // redisClient.expire(key,60);
    return freshData;
}

module.exports = {getOrSetCache};