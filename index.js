const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//Enable Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
