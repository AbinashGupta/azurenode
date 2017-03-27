var exp = require('express');
var app = exp();
//for microsoft sql server ----
var sql_serv = require('mssql');
//for mysql -------------------
var mysql = require('mysql');

//var extIP = require('external-ip');
// 
//var getIP = extIP({
//    replace: true,
//    services: ['http://www.google.co.in'],
//    timeout: 6000,
//    getIP: 'parallel'
//});
 
//getIP(function (err, ip) {
//    if (err) {
//        throw err;
//    }
//    console.log(ip);
//});

sql_serv.connect({  
    server:'abitestdbserver.database.windows.net',
    port:'1433',
    username:'Abi.testserver',
    password:'db.pa$$word123',
    database:'testdb'
}, function (error) {
   if (error) {console.log(error); return;} else {console.log('Connection established !')}
    new sql_serv.Request().query('SELECT TOP 3 * FROM testdb.student_data;', function (error, results) {
      if (error) { console.log(error); throw error;} 
      console.log('the student details from SQL server are: ')
      results.map(function (item) {
          console.log(JSON.stringify(item));
      });
    });
});



var my_sql = mysql.createConnection({
    host:'in-cdbr-azure-central-b.cloudapp.net',
    user:'bce395653ae7b9',
    password:'4fc94a79',
    database:'abicleardb'
});

my_sql.connect();

my_sql.query('SELECT * FROM abicleardb.student_data LIMIT 3;', function (error, results, fields) {
  if (error) throw error; 
  console.log('the student details from clearDB are: ')
  results.map(function (item) { 
      console.log(JSON.stringify(item));
  });
});

my_sql.end();



var port = process.env.port || 8080;

app.listen(port);