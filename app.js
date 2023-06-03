const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const port = 8000;

app.use('/static',express.static('static'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database:'dance_db'
});

//PUG FILING
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/',(req,res)=>{
  res.status(200).render('home.pug',{title:'Dance Academy'});
});

app.get('/contact', (req, res) => {
  res.status(200).render('contact.pug', { title: 'Dance Academy' });
});

app.post('/contact', (req, res) => {
  var datam = req.body;
  var name = datam.Name;
  var age = datam.Age;
  var email = datam.Email;
  var password = datam.Password;
  var address = datam.Address;
  var descp = datam.desc;
  
  con.connect(function(err) {
    if (err) {console.log('Here is mistake.')};
    console.log("Connected!");
    
    var sql = `INSERT INTO USERS(NAME,AGE,ADDRESS,EMAIL,PASSWORD,DESCP) VALUES('${name}',${age},'${address}','${email}','${password}','${descp}')`;
    
    con.query(sql, function(err, result){
    if (err) {
          res.send('Form cannot Submitted Successfully')
        };
        console.log("Data added Successfully");
        res.send('Form Submitted Successfully.')
      });
  });
});

app.listen(port ,()=>{
  console.log(`Website is running at localhost:${port}`);
})