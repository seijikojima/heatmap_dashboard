const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5002
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'))

const mysql = require('mysql');
require('dotenv').config();

const config = {
  host: 'mysql',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWD,
  database: process.env.MYSQL_DB
}

const pool = mysql.createPool(config);

// get all data
app.get('/items', function (req, res) {

  pool.getConnection(function(err,conn){
    if(err) throw err;
    const query = 'SELECT * FROM ml_results'
    conn.query(query,function(error,results){
      if(error) throw error;
      res.send(results);
      conn.release();
    });
  });
});

app.get('/checked_items/', function (req, res) {

  const sql = "SELECT * FROM ml_results WHERE check=true";
  pool.getConnection(function(err,conn){
    if(err) throw err;
    conn.query( sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
      conn.release();
    });
  });
});

// change propaty
app.put('/items', function (req, res) {
  console.log(req.body.payload)
  var data = req.body.payload
  const sql = "UPDATE ml_results SET ? WHERE id = " + req.body.payload.id;
  pool.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(sql, data, (err, results) => {  
		  if (err) throw err;
		  console.log(results);
      res.send(results);
      conn.release();
    });
  });
}); 

app.listen(port, () => console.log(`backend server on port ${port}!`))