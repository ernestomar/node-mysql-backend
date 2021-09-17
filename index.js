//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')
var sha256 = require('js-sha256')
var jwt = require('jsonwebtoken');

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

conn.connect(
    function (err) { // en err llega errores de conexion
        if (err) {
            console.log("********** ERROR ********", err);
            throw err;
        }
        // Si no existen errores de conexion
        console.log("Connected!");
    }
);

app.get("/", (req, res, next) => {

    const token = req.headers.authorization;
    if ( !validateToken(token) ) { //si el token no es valido retorno error
        res.status(403).render();
    }
    const sql = "SELECT * FROM task";

    conn.query( sql, 
        function (err, result) { // CALLBACK HELL -> PROMISES CASCADE HELL -> ASYNC AWAIT
            if (err) throw err; // Si existe error se para la ejecucion con throe
            // Si no existe error imprimimos en consola 
            console.log("Result: " + result);
            // Retornamos el contendio
            res.json(result);
        }
    );    
    
});

function hashPassword(pwd) {
    return(sha256.sha256(sha256.sha256(pwd + "tigre_campeon") + "ucb"))
}

app.post("/user", jsonParser, (req, res, next) => {

    const userData = req.body;
    const passwordHash = hashPassword(userData.password);

    const sql = "INSERT INTO tk_user VALUES (null, '"+ userData.username + "', '"+ passwordHash +"') ";

    conn.query( sql, 
        function (err, result) { // CALLBACK HELL -> PROMISES CASCADE HELL -> ASYNC AWAIT
            if (err) throw err; // Si existe error se para la ejecucion con throe
            // Si no existe error imprimimos en consola 
            console.log("Result: " + result);
            // Retornamos el contendio
            res.json(result);
        }
    );
        
    
    
});


app.post("/auth", jsonParser, (req, res, next) => {

    const userData = req.body;
    const passwordHash = hashPassword(userData.password);

    const sql = " SELECT user_id, username FROM tk_user " +
                " WHERE ( username =  '"+ userData.username + "' AND user_password = '"+ passwordHash +"') ";
    // SELECT user_password FROM tk_user WHERE username = 'user';
    let resultQuery;

    conn.query( sql, 
        function (err, result) { // CALLBACK HELL -> PROMISES CASCADE HELL -> ASYNC AWAIT
            if (err) throw err; // Si existe error se para la ejecucion con throe
            // Si no existe error imprimimos en consola 
            
            if(result.length == 1) {
                const token = buildToken(result[0].user_id, result[0].username);
                // Retornamos el contendio
                res.json({ token: token });
            } else {
                res.status(401).send();
            }
        }
    );

    
});

// Esta funcion construye un token seguro
function buildToken(userId, username) {
    const payload = {
        userId: userId,
        username: username
    }
    return jwt.sign(payload, "11223344");
}

// Valida si un token que me envio el cliente (navegador, flutter, angular, vue) es valido
function validateToken(token) {
    let result = false;
    try {
        jwt.verify(token,"11223344")
        result = true;
    } catch(err) {
        // Do nothing
    }
    return result;
}

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});
