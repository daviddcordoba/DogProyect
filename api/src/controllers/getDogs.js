const getApiData = require('./getApiData');
const getDbData = require('./getDbData');
const getDogByName = require('./getByName');


async function getDogs(req,res){ // handler manejador maneja errores
    try{
        const {name} = req.query;

        if(name){
            const response = await getDogByName(name);
            if(response){
                return res.status(200).json(response);
            } 
        }

        const data_api = await getApiData();
        const data_db = await getDbData();

        return res.status(200).json([...data_api,...data_db])
    }
    catch(err){
        return res.status(500).json({error: err.message}) 
    }
} 

module.exports = getDogs

//q pasa si fall seria 500?