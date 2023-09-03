const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const showRoutes = require('./routes/showRoutes');
const connectDB = require('./config/db'); 

const app = express();
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB(); 

app.use('/auth', authRoutes);
app.use('/shows', showRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app

