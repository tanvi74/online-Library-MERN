const express = require('express');
const app = express();
const mongoDb = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));

// Import Routes
const authRoute= require('./routes/auth');
const addBookRoute = require('./routes/addbook');

// Connect to db
mongoDb();

// Middleware
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/admin', addBookRoute);

app.listen(5000, ()=> console.log("Server is running") )