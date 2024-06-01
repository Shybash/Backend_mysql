// backend/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const poll = require('./db');
const getEmployees = require('./Routes/GetEmployee');
const addEmployeeRouter = require('./Routes/Addemployee');
const deleteEmployeeRouter = require('./Routes/DeleteEmployee');
const categoryRouter = require('./Routes/Category');
const transaction=require('./Routes/Transaction');
const CountEmployee=require('./Routes/CountEmployee');
const CountTransaction=require('./Routes/CountTrnasaction');
const CountCategories=require('./Routes/CountCategories');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', addEmployeeRouter);
app.use('/api', getEmployees);
app.use('/api', deleteEmployeeRouter);
app.use('/api', categoryRouter);
app.use('/api', transaction);
app.use('/api',CountEmployee);
app.use('/api',CountTransaction);
app.use('/api',CountCategories);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
