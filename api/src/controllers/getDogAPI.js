const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env
const axios = require('axios');
//ESTA FUNCION RETORNA UN DOG QUE FUE BUSCADO POR ID EN LA API
async function getDogAPI(id) {
    try {
        const { data } = await axios.get(`${URL}?api_key=${API_KEY}`);
        
        const dogFound = data?.find(dog => dog.id == id);
        if (!dogFound) {
            throw new Error(`No se ha encontrado el dog con id: ${id}`);
        }
        
        const dog = {
            id: dogFound.id,
            imagen: dogFound.image?.url,
            nombre: dogFound.name,
            altura_min: dogFound.height.metric.split('-')[0]?.trim(),
            altura_max: dogFound.height.metric.split('-')[1]?.trim(),
            peso_min: dogFound.weight.metric.split('-')[0]?.trim(),
            peso_max: dogFound.weight.metric.split('-')[1]?.trim(),
            anosVida: dogFound.life_span?.split(' years')[0],
            temperament: dogFound.temperament
                        ? dogFound.temperament.split(',').map(temp => temp.trim())
                        : [],
            created: false
        };
        return dog;

        } catch (error) {
            throw new Error(error);
        }
    }
    
    module.exports = getDogAPI;
