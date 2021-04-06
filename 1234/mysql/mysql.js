const mysql = require('mysql');

const contion = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'test'

})
contion.connect((err) => {});


function select(){
  return new Promise((resolve,reject)=>{
    contion.query(`SELECT * FROM orderlist `, function (error, results) {
      resolve(results)
    })
  })
}
module.exports={
  select
}