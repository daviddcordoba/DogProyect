const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env;
const axios = require('axios');

async function getApiData(){
    try {
        const {data} = await axios.get(`${URL}?api_key=${API_KEY}`);
        const dog_data_api = data?.map(dog => {
            return {
                id: dog.id,
                imagen: dog.image.url,
                nombre: dog.name,
                altura: dog.height.metric,
                peso: dog.weight.metric,
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