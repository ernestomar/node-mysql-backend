

const configuracion = { host: "localhost", port: 3306};

connect (configuracion, function(err) {
    console.log("Dentro de la función ", err);
});

/*
connect (null, function(err) {
    console.log("Dentro de la función ", err);
});
*/

function connect ( config, callbackFn ) {
    console.log("DEntro de connect");
    // Luego de inicializa los datos
    if (config) {
        // Procedo a establecer la conexion ...
            // Codigo para establecer la conexion.
        //Luego ejecuto el codigo del programador que usa mi libreria.
        callbackFn();
    } else {
        // Retorno error
        callbackFn("DEbe proporcionar un objeto config");
    }

}