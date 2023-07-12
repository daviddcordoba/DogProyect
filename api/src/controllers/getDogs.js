const getApiData = require('./getApiData');
const getDogByName = require('./getByName');
const getDbData = require('./getDbData');


async function getDogs(req,res){
    try{
        const {name} = req.query;

        if(name){
            const response = await getDogByName(name);
            console.log('response:',response)
            if(response){
                return res.status(200).json(response);
            } 
        }

        const data_api = await getApiData();
        const data_db = await getDbData();

        return res.status(200).json([...data_api,...data_db])
    }
    catch(err){
        return res.status(404).json({error: err.message}) 
    }
} 

module.exports = getDogs

