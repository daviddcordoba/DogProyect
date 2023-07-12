const {Dog,Temperaments } = require('../db');

async function createDog(req,res){
    try {
        const { nombre, altura,peso,anosVida,temperaments} = req.body;

        if( !nombre || !altura || !peso || !anosVida || !temperaments){
            throw Error("Faltan datos")
        }

        const [newDog,created] = await Dog.findOrCreate({
            where: {nombre: nombre},
            defaults: {altura,peso,anosVida,created:true}
        })

        //relacion con su temperament
        const temperaments_db = await Temperaments.findAll({where:{nombre:temperaments}  })
        await newDog.setTemperaments(temperaments_db)//para mi aca va con set y si estoy en el put va add

        return res.status(200).json(newDog)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = createDog





