import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("connect", () => {
  console.log("Connected to Redis!");
});

client.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

const testRedis = async (): Promise<void> => {
  try {
    await client.connect();

    const userId = 1;
    const key = `user:${userId}:posts`;
    const value = await client.get('randomSiteData');

    if (value) {
      const parsedData = JSON.parse(value);
      const data = parsedData.userId = 1;
      console.log(`Retrieved data for userId ${userId}:`, data);
    } else {
      console.log(`No data found for userId ${userId}`);
    }
    await client.quit();
    console.log("Disconnected from Redis.");
  } catch (err) {
    console.error("Error:", err);
  }
};

testRedis();
