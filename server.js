// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Routes
// const reviewsRoutes = require('./routes/reviews');
// app.use('/api/reviews', reviewsRoutes);

// // Start server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 


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

// Database connection (Updated: Removed deprecated options)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Test Route (To Check If API is Live)
app.get('/', (req, res) => {
    res.send('✅ Backend is live!');
});

// Routes
const reviewsRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

