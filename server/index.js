const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors')
const path = require('path')
const connectDB = require('./database/db');
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')))

app.use('/users', require('./routes/users'));

app.use('/reports', require('./routes/reports'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));