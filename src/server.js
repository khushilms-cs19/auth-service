const express = require('express');
const { client } = require('./util/redis/redis');
const cors = require('cors');
// Routers
const authRouter = require('./routes/authRoutes');


//redis connect
client.connect();


// Constants
const PORT = process.env.PORT || 5000;

// Initialize app
const app = express();

// Pre-requisites 
app.use(express.json());
app.use(cors());

// Server routes
app.use('/auth', authRouter);

//ping 
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
// Server running
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});