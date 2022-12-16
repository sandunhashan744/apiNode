const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const empRouter = require('./routes/employeeRoute');
app.use("/employees",empRouter);

const PORT = process.env.PORT || 4000; //runing port
const URL = process.env.MONGO_URL;
mongoose.connect(URL)
    .then(()=>{
        console.log('connected...!')
    })
    .catch((err)=>console.log(err))


app.listen(PORT, () => {
    console.log('server Running on port ' + PORT);
})

