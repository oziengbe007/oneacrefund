const express = require('express');
const redis = require('redis');

const app = express();

// Create Redis client
const client = redis.createClient({
  host: 'redis', // This should match your Docker Compose service name
  port: 6379     // Default Redis port
});

// Handle Redis connection
client.on('connect', () => {
  console.log('Connected to Redis successfully');
});

client.on('error', (err) => {
  console.error('Failed to connect to Redis:', err);
  process.exit(1); // Exit the process if Redis connection fails
});

// Define the API route
app.get('/', (req, res) => {
  // Increment the hit counter
  client.incr('hits', (err, hits) => {
    if (err) {
      return res.status(500).send('Error incrementing hits');
    }
    res.send(`Hits: ${hits}`);
    console.log(hits);
  });
});

// Start the Express server
app.listen(30200, () => {
  console.log('App listening on port 30200');
});
