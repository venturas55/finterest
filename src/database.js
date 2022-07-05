const mysql = require('mysql');
const {promisify}=require('util');
const {database} = require('./keys'); //traigo el database desde el archivo keys
const pool = mysql.createPool(database);    
//const Pool = require('mysql/lib/Pool');


mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion con la Database fue cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La Database tiene demasiadas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('database conexion fue rechazada');
        }
    }

    if(connection) connection.release(); //con esto empieza la conexion
    console.log('DB is Connected');
    return;
});

//promisify pool queries
pool.query=promisify(pool.query); //cada vez que haga una consulta, se hará con una promesa.

module.exports = pool;