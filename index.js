const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'database-1.c9wse2gay9rc.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AstroHack00',
  database: 'myappdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

app.post('/users', (req, res) => {
  const { name, age, gender } = req.body;
  const sql = 'INSERT INTO users (name, age, gender) VALUES (?, ?, ?)';
  db.query(sql, [name, age, gender], (err, result) => {
    if (err) throw err;
    res.send('User added successfully');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

