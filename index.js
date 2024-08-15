const express = require('express');
const errohanler = require('./middleware/err');
const app = express();
const dotenv = require('dotenv').config();
const db_conn = require('./database/db_conn');
const cors = require('cors');

db_conn();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: "hoiii" });
});

app.use('/api', require("./router/Route"));
app.use('/api', require("./router/Event"));
app.use('/api', require("./router/ticket_book"));

app.use(errohanler);

const port = process.env.PORT || 9999;
app.listen(port, () => {
    console.log(`my port is ${port}`);
});

console.log("hii");
