const getApiData = require('./getApiData');
const getDbData = require('./getDbData');


async function getByName(name){
    try {
        const data_api = await getApiData();
        const data_db = await getDbData();
        const allDogs = [...data_api,...data_db];
        
        const dogFound = allDogs.find(dog => dog.nombre.toLowerCase() == name.toLowerCase())

        if(!dogFound) throw Error(`No se ha encontrado el perro con nombre: ${name}`)
        return dogFound;
    } catch (error) {
        throw Error(`Ha ocurrido un error en la búsqueda de razas de perro: ${error.message}`)
    }
}

module.exports = getByName

//la api ignora las mayus y minus
