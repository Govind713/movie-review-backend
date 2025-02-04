const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const reviewsRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewsRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));