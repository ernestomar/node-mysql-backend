//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

var surrogateKey = 1;

// Código para la BAse de Datos.
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ABCabc123",
  port: 3355,
  database: "tasks"
});


app.get("/", (req, res, next) => {

    const sql = "SELECT * FROM task";

    let resultQuery;
    
    conn.connect(
        function (err) { // en err llega errores de conexion
            if (err) {
                console.log("********** ERROR ********", err);
                throw err;
            }
            // Si no existen errores de conexion
            console.log("Connected!");

            conn.query( sql, 
                function (err, result) { // CALLBACK HELL -> PROMISES CASCADE HELL -> ASYNC AWAIT
                    if (err) throw err; // Si existe error se para la ejecucion con throe
                    // Si no existe error imprimimos en consola 
                    console.log("Result: " + result);
                    // Retornamos el contendio
                    res.json(result);
                }
            );
        }
    );
    
});


app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});
