import axios from 'axios';
import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

const fetchAndStoreData = async () => {
    try {
        await redisClient.connect();

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data;

        const key = 'randomSiteData';
        await redisClient.set(key, JSON.stringify(data));
        console.log(`Data stored in Redis under key "${key}".`);

        const cachedData = await redisClient.get(key);
        console.log('Retrieved from Redis:', JSON.parse(cachedData || '{}'));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await redisClient.quit();
    }
};

fetchAndStoreData();
