const getDogDB = require('./getDogDB')
const getDogAPI = require('./getDogAPI')

async function getByRaza(req,res){
    const {id} = req.params;

    try {
        if(isNaN(id)){
            return res.status(200).json(await getDogDB(id));
        }
        return res.status(200).json(await getDogAPI(id));
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

module.exports = getByRaza

