const {Dog,Temperaments} = require('../db');


//ESTA FUNCION TRAE TODOS LOS PERROS DE LA DB
async function getDbData (){
    const data_db = await Dog.findAll({
        include: {
            model:Temperaments,
            attributes:['nombre'],
            through:{
                attributes:[]
            },
            raw: true 
        }
    });
    
    if(!data_db) throw Error("Ha ocurrido un error al traer informacion de la base de datos");
    
    const formatted_data_db = data_db.map(dog => {
        return {
            id: dog.id,
            imagen: dog.imagen,
            nombre: dog.nombre,
            altura_min: dog.altura_min,
            altura_max: dog.altura_max,
            peso_min: dog.peso_min,
            peso_max: dog.peso_max,
            anosVida: dog.anosVida,
            temperaments: dog.temperaments.map(temp => temp.nombre), //porq quiero que sea temperaments:['a','b']
            created: dog.created,
        };
    });
    
    return formatted_data_db;
}

module.exports = getDbData
