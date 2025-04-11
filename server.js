const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);

const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirnamePath, 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
