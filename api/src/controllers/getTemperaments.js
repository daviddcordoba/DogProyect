const {Temperaments } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';
const {API_KEY} = process.env
const axios = require('axios');
const extractTemperaments = require('./extractTemperaments')

async function getTemperaments(req, res) {
    try {
        let temperaments = [];
        const { data } = await axios.get(`${URL}?api_key=${API_KEY}`);

        temperaments = extractTemperaments(data);
        temperaments.forEach(async temp => await Temperaments.findOrCreate({where: {nombre: temp}}))
        
        const temperaments_db = await Temperaments.findAll();
        console.log(temperaments_db.map(temp=> temp.nombre))
        return res.status(200).json(temperaments_db);
    } catch (error) {
        return  res.status(400).json({error:error.message});
    }
}

module.exports = getTemperaments