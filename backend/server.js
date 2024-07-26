require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/authRoutes');
const meetingRoutes = require('./src/routes/meetingRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api', meetingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

sequelize.sync()
  .then(() => {
    console.log('Database & tables synchronized!');
  })
  .catch(error => console.error('Error synchronizing database:', error));
