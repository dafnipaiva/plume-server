const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors);
app.use(express.json());

// URL env file
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established'))
  .catch((err) => console.error('MongoDB connection error:', err));

const subscriptionsRouter = require('./routes/subscriptions');
const usersRouter = require('./routes/users');

app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
