import inquirer from 'inquirer';
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'seleccione una opcion',
        choices: [
            {
                value: '1',
                name: `${'1.-'.red} crear tarea `
            },
            {
                value: '2',
                name: `${'2.-'.black} listar tareas `
            }, {
                value: '0',
                name: 'Salir'
            }]
    }
]
//menu de opciones
const menu = async () => {
    console.clear();
    console.log('====  SELECCIONE UNA OPCION ===== \n'.red);
    const { opcion } = await inquirer.prompt(preguntas)
    return opcion;
}
//espera la confirmacion en las opciones
const pause = async () => {
    await inquirer.prompt(
        {
            type: 'input',
            name: 'respuesta',
            message: 'presione ENTER pasa salir'
        })
}
//leer los datos escritos en consola y validar los mismos
async function leerInput (message){
    const { desc } = await inquirer.prompt({
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return `${'ingrese una descripcion de la tarea'.red} ${value.length}`;
            }
            return true;
        }
    })
    return desc
}
//checar tareas
const listadoTareasChecker = async (tareas = []) => {
    const opciones = tareas.map((tarea, i) => {
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.fecha) ? true : false
        }
    });
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: opciones
        }
    ]
    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

//Borrar tareas
const listadoTareasBorrar = async (tareas = []) => {
    const opciones = tareas.map((tarea, i) => {
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    opciones.unshift({
        value: '0',
        name: '0.' + 'cancelar'
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: opciones
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}
//confirmacion de jecucion de accion
const confirmacion = async (message) => {
    const { ok } = await inquirer.prompt(
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    )
    return ok;
}
module.exports = {
    menu, pause, leerInput, listadoTareasBorrar, confirmacion, listadoTareasChecker
}
