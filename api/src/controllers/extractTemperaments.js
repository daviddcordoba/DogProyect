
//ESTA FUNCION RECORRE TODOS LOS DOGS PARA QUEDARSE ,SI TIENE, CON SUS TEMPERAMENTOS.
//PARA ASI DESPUES SUBIRLOS A LA DB
function extractTemperaments (data){
    let temperaments = [];

    for (let i = 0; i < data.length; i++) {
        if(data[i].hasOwnProperty('temperament')){
            let temperamentString = data[i].temperament;
            if (temperamentString) {
                const splitTemperaments = temperamentString.split(',').map(temp => temp.trim());
                temperaments.push(...splitTemperaments);
            }}
    }

    return temperaments;
}

module.exports = extractTemperaments