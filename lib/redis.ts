import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

export async function* subscribeToChannel(channelName: string) {
  while (true) {
    try {
      const message = await redis.subscribe(channelName)
      if (message) {
        yield message
      }
      // Small delay to prevent tight loop
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error('Redis subscription error:', error)
      // Delay before retry
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
