const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const userRoutes = require('./routes/User');

const postRoutes = require('./routes/Post');

const taskRoutes = require('./routes/Task');

require('dotenv').config();

const app = express();
const PORT = 5002;

mongoose.connect("mongodb+srv://garimagarg112:garimagarg112@cluster0.3r0qbab.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(cors());

app.use(express.json());



app.use('/Uploadimage', express.static('Uploadimage'));


app.use('/', userRoutes);

app.use('/post', postRoutes);

app.use('/task', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
