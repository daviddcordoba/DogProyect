const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env;
const axios = require('axios');

///ESTA FUNCION RETORNA UNA ARREGLO CON TODOS LOS DOGS DE LA API
async function getApiData(){ //controller ?
    try {
        const {data} = await axios.get(`${URL}?api_key=${API_KEY}`);
        
        const dog_data_api = data?.map(dog => {
            return {
                id: dog.id,
                imagen: dog.image.url,
                nombre: dog.name,
                altura_min: dog.height.metric.split('-')[0]?.trim(),
                altura_max: dog.height.metric.split('-')[1]?.trim(),
                peso_min: dog.weight.metric.split('-')[0]?.trim(),
                peso_max: dog.weight.metric.split('-')[1]?.trim(),
                anosVida: dog.life_span.split(' years')[0],
                temperaments: dog.temperament?dog.temperament.split(',').map(temp => temp.trim()):[],
                created: false
            }
        })  
        return dog_data_api;
    }catch (error) {
        throw Error(error);
    }
}

module.exports = getApiData;

