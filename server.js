const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Expense=require('./models/Expense');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Connection error:', err.message);
});

const expenseRoute = require('./routes/expenseRoute');
const incomeRoute = require('./routes/incomeRoute');

app.use('/expenses', expenseRoute);
app.use('/income', incomeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});