const {Dog,Temperaments} = require('../db');


//ESTA FUNCION TRAE UN DOG DE LA API EN ESPECIFICO POR ID
async function getDogDB(_id){
    const data_db = await Dog.findByPk(_id,{
        include: {
            model:Temperaments,
            attributes: ['nombre'],
            through: {attributes:[]}
        }
    })
    if(!data_db) throw Error(`No se ha encontrado el dog con id: ${_id}`);

    const {id,imagen,nombre,altura_min,altura_max,peso_max,peso_min,anosVida,created,temperaments} = data_db.dataValues;

    const dog = {
        id,
        imagen,
        nombre,
        altura_min,
        altura_max,
        peso_min,
        peso_max,
        anosVida,
        created,
        temperaments: temperaments.map(temp => temp.nombre)
    }

    return dog;
}

module.exports = getDogDB;