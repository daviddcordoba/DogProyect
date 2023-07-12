const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env
const axios = require('axios');

async function getDogAPI(id){
    try {
        const {data} = await axios.get(`${URL}?api_key=${API_KEY}`);

        const dogFound = data?.find( dog => dog.id == id); // con el operador '?.' estoy verificando si es null o undefinded, sin generar un error de tipo TypeError
        if(!dogFound) throw Error(`No se ha encontrado el dog con id: ${id}`);
        
        const dog = {
                id: dogFound.id,
                imagen: dogFound.image.url,
                nombre: dogFound.name,
                altura: dogFound.height.metric,
                peso: dogFound.weight.metric,
                anosVida: dogFound.life_span.split(' years')[0],
                temperament: dogFound.temperament ? dogFound.temperament.split(',').map(temp => temp.trim()) :[],
                created: false
        }
        return dog;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = getDogAPI;