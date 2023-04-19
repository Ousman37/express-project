const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

// Connect db
connectDb();
const app = express();

const port = process.env.PORT || 5000;

// init middleware
app.use(express.json());
app.use('/api/contacts', require('./router/contactRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
