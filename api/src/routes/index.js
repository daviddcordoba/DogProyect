const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const getTemperaments = require('../controllers/getTemperaments');
const createDog = require('../controllers/createDog');
const getByRaza = require('../controllers/getByRaza');

const router = Router();

// Configurar los routers
router.get('/dogs',getDogs); // aca va el ?name
router.get('/temperaments',getTemperaments);
router.get('/dogs/:id',getByRaza);
router.post('/dogs',createDog);

module.exports = router;
