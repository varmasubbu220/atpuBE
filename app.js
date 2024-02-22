const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const { testConnection } = require('./connections/databaseConnection');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT;
const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization', 'Custom-Header'],
};

app.use(cors(corsOptions));
const router = require('./routes/routes');
app.use('/user', router);
// Allow CORS for other routes
app.options('*', cors(corsOptions));
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  testConnection();
});

