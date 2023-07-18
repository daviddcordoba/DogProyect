import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getTemperaments } from "../redux/actions";

const CreateDog = ({allTemperaments}) => {
    const dispatch = useDispatch();
    

    const [ newDog,setNewDog] = useState({
        nombre:'',
        altura_min: 0,
        altura_max: 0,
        peso_min: 0,
        peso_max: 0,
        anosVida: 0,
        temperament:[]
    })

    const [selectedTemperaments, setSelectedTemperaments] = useState([]);

    useEffect(()=>{
        dispatch(getTemperaments());
    },[])
    

    function handleTemperamentSelection(event) { // esto podria tenerlo dentro de un controllador
        const selectedTemperament = event.target.value;
        console.log('temp selec',selectedTemperament)
        let updatedTemperaments; // esto es para tener actualizado los Temperaments
    
        // LOGICA PARA AGREGAR Y SACAR AL MOMENTO DE TILDAR //
        if (selectedTemperaments.includes(selectedTemperament)) {
          updatedTemperaments = selectedTemperaments.filter(temp => temp !== selectedTemperament);
        
        } else {
          updatedTemperaments = [...selectedTemperaments, selectedTemperament];
        }
    
        setSelectedTemperaments(updatedTemperaments);
        setNewDog({
          ...newDog,
          temperaments: updatedTemperaments
        });
    }

    

    function handleChange(event){

        if(event.target.nombre != 'nombre' ){}
    }

    return (
    <div>CreateDog

        <form>
            <label>Nombre:</label>
            <input 
                type="text"
                value={newDog.nombre}
                name="nombre"
                placeholder="Ingresa un nombre"
                onChange={handleChange}

            />
            <br/>
            <label>Altura minima:</label>
            <input 
                type="number"
                value={newDog.altura_min}
                name="altura_min"
                placeholder="Ingresa una altura minima"
                onChange={handleChange}
            />
            <br/>
            <label>Altura maxima:</label>
            <input 
                type="number"
                value={newDog.altura_max}
                name="altura_max"
                placeholder="Ingresa una altura maxima"
                onChange={handleChange}
            />
            <br/>
            <label>Peso minimo:</label>
            <input 
                type="number"
                value={newDog.peso_min}
                name="peso_min"
                placeholder="Ingresa un peso minimo"
                onChange={handleChange}
            />
            <label>Peso maximo:</label>
            <input 
                type="number"
                value={newDog.peso_max}
                name="peso_max"
                placeholder="Ingresa un peso maximo"
                onChange={handleChange}
            />

            <label>anosVida:</label>
            <input 
                type="number"
                value={newDog.anosVida}
                name="anosVida"
                placeholder="Ingresa anosVida"
                onChange={handleChange}
            />
            Tipos: 
            {allTemperaments.map(((temp,id) =>{
                return <label key={id}>
                {temp.nombre}
                <input
                type="checkbox"
                name='temperaments'
                value={temp.nombre}
                checked={selectedTemperaments?.includes(temp.nombre)}
                onChange={handleTemperamentSelection}
                />
            </label>
            }))}
        </form>
    </div>
)
}

export default CreateDog