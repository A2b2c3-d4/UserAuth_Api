const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

connectDB();

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);







app.listen(PORT, () => {
    console.log(`Server is listenng on port ${PORT}`);
})