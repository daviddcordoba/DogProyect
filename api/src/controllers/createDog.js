const {Dog,Temperaments } = require('../db');

async function createDog(req,res){
    try {
        const { nombre,peso_min,peso_max,altura_min,altura_max,anosVida,temperaments,imagen} = req.body;

        if( !nombre || !peso_max || !anosVida || !temperaments || !peso_min || !altura_min || !altura_max || !imagen){
            throw Error("Faltan datos")
        }

        const [newDog,created] = await Dog.findOrCreate({
            where: {nombre: nombre},
            defaults: {peso_min,peso_max,altura_max,altura_min,anosVida,imagen,created:true}
        })

        //relacion con su temperament
        const temperaments_db = await Temperaments.findAll({where:{nombre:temperaments}  })
        await newDog.setTemperaments(temperaments_db)//para mi aca va con set y si estoy en el put va add

        return res.status(201).json(newDog)
    } catch (error) {
        return res.status(400).json({error: error.message}) // 400 es cuando 
    }
}

module.exports = createDog





