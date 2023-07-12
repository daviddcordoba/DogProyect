const {Dog,Temperaments} = require('../db');

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
            altura: dog.altura,
            peso: dog.peso,
            anosVida: dog.anosVida,
            temperaments: dog.temperaments.map(temp => temp.nombre), //porq quiero que sea temperaments:['a','b']
            created: dog.created,
        };
    });
    
    return formatted_data_db;
}

module.exports = getDbData
