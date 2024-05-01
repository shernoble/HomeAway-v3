const { Redis } = require('@upstash/redis')

const redisClient = new Redis({
    url: 'https://caring-ram-34217.upstash.io',
    token: 'AYWpAAIncDFjMjA5ZGUxOGYwNTU0YzAwYTIwOTY0OTFiMDM2NmRlMHAxMzQyMTc',
  })

  module.exports = redisClient;