const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection URL
const url = process.env.MONGO_URL;
const dbName = 'goexpert';

async function main() {
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Define a route for the root URL
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    // POST endpoint to add a user
    app.post('/users', async (req, res) => {
      try {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.status(201).send(result.ops[0]);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);
