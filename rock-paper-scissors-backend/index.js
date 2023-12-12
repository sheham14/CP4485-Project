const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
    res.setHeader('Content-Security-Policy', 'default-src * data:; font-src * data:; img-src * data:;');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
  app.use(bodyParser.json());
   // Enable CORS for all routes
const port = 3000;

// Replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual MongoDB connection string
mongoose.connect('mongodb://localhost:27017/CP4485_Final_Project', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a mongoose schema for the HighScores collection
const highScoreSchema = new mongoose.Schema({
    playerName: String,
    score: Number,
    timestamp: { type: Date, default: Date.now }
  });
  
  // Create a mongoose model based on the schema
  const HighScore = mongoose.model('High_Score', highScoreSchema);

app.use(bodyParser.json());

// Route to retrieve high scores
app.get('/high_scores', async (req, res) => {
  try {
    // Retrieve high scores from the MongoDB collection
    const highScores = await HighScore.find().sort({ score: -1 }).limit(10);
    res.json(highScores);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new high score
app.post('/high_scores', async (req, res) => {
  try {
    // Extract player name and score from the request body
    const { playerName, score } = req.body;

    // Create a new HighScore document
    const newHighScore = new HighScore({
      playerName,
      score
    });

    // Save the new high score to the MongoDB collection
    await newHighScore.save();

    res.json({ success: true, message: 'High score added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/save-score', async (req, res) => {
    try {
      // Extract player name, score, and timestamp from the request body
      const { playerName, score, timestamp } = req.body;
  
      // Create a new HighScore document
      const newHighScore = new HighScore({
        playerName,
        score,
        timestamp
      });
  
      // Save the new high score to the MongoDB collection
      await newHighScore.save();
  
      res.json({ success: true, message: 'High score added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

