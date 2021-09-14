main();

async function main() {
    const configuracion = { host: "localhost", port: 3306};
    try {
        await connect(null);
        console.log("No hubieron errores")
    } catch (err) {
        console.log("ERROR ", err);
    }
    
}

function connect ( config ) {
    console.log("Dentro de connect");
    let promise = new Promise(function(resolve, reject){
        // Luego de inicializa los datos
        if (config) {
            // Procedo a establecer la conexion ...
                // Codigo para establecer la conexion.
            //Luego ejecuto el codigo del programador que usa mi libreria.
            resolve();
        } else {
            // Retorno error
            reject("DEbe proporcionar un objeto config");
        }
    });
    return promise;

}