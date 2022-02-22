const { menu, pause } = require('./helpers/inquirer');


const main = async () => {
    let opcion;
    do {
        opcion = await menu();
        console.log(opcion);
        await pause();
    } while (opcion!==0);

}
main();