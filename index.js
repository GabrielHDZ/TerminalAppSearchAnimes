require('dotenv').config();
const { menu, pause, leerInput, listadoAnimes } = require('./helpers/inquirer');
const { Busqueda } = require('./models/modelo');

const busqueda = new Busqueda()
//console.log(process)
console.log(process.env)
//console.log(process.config)


const main = async () => {
    let opcion;
    do {
        opcion = await menu();
        console.log(opcion);
        switch (opcion) {
            case '1':
                //mostrar mensaje
                const entrada = await leerInput('termino a buscar')
                console.log(entrada)
                //buscar los lugares con el termino escrito en la entrada
                const response = await busqueda.buscador(entrada)
                //seleccionar el lugar
                const elegido = await listadoAnimes(response);
                //mostrar los resultados
                const datos = await busqueda.buscadorEspecifico(elegido);

                console.log(datos);
                break;
            case '2':
                break;
        }
        if (opcion !== '0') await pause();
    } while (opcion !== '0')

}
main(); 