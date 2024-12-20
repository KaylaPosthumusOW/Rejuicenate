const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  // No need for useNewUrlParser and useUnifiedTopology options in newer versions
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));
// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/profileImages', express.static(path.join(__dirname, 'profileUploads')));

// Routes (Access Points for API)
// ----------------------------------------------
// Users
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/categories', categoryRoutes);

const juiceRoutes = require('./routes/juiceRoutes');
app.use('/juices', juiceRoutes);

const likedJuicesRoutes = require('./routes/likedJuicesRoutes');
app.use('/likedJuices', likedJuicesRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/reviews', reviewRoutes)

const personalInfoRoutes = require('./routes/personalInfoRoutes');
app.use('/personalInfo', personalInfoRoutes)

const trackedDataRoutes = require('./routes/trackedDataRoutes');
app.use('/trackedData', trackedDataRoutes)

// -----------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

