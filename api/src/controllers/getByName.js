const {Dog,Temperaments} = require('../db');
const { Op } = require('sequelize');
const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env
const axios = require('axios');

async function getByName(name){
    try {
        const data_db = await Dog.findAll({
            where: {
                nombre: {
                  [Op.iLike]: `%${name}%` // En este ejemplo, se utiliza la cláusula where para especificar la condición de búsqueda. Dentro de la condición, se utiliza sequelize.Op.iLike para realizar la búsqueda sin distinguir entre mayúsculas y minúsculas. El % antes y después de name indica que se buscará cualquier coincidencia parcial del nombre en la base de datos.
                }
              },
            include: {
            model: Temperaments,
            attributes: ['nombre'],
            through: {
                attributes: [],
            },
        },
    });
        console.log(data_db)
        //data db es un arreglo por eso al final hago ...

        const {data} = await axios.get(`${URL}/search?q=${name}`);
        //console.log(data[0])
        const data_api = {
            id: data[0].id,
            //imagen: data[0].image.url,
            nombre: data[0].name,
            altura: data[0].height.metric,
            peso: data[0].weight.metric,
            anosVida: data[0].life_span.split(' years')[0],
            temperament: data[0].temperament ? data[0].temperament.split(',').map(temp => temp.trim()) :[],
            created: false
        }
        //data_api es un obj asiq no puedo hacer ... pq no es iterable
        if (data_db.length === 0 && data.length === 0) {
            throw Error(`No se han encontrado razas de perro con el nombre: ${name}` );
          }
        return [data_api,...data_db]
    } catch (error) {
        throw Error(`Ha ocurrido un error en la búsqueda de razas de perro: ${error.message}`)
    }
}

module.exports = getByName

//la api ignora las mayus y minus