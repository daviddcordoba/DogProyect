import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { createDog, getTemperaments } from "../../redux/actions";

const CreateDog = ({allTemperaments}) => {
    const dispatch = useDispatch();
    
    const [ newDog,setNewDog] = useState({
        nombre:'',
        altura_min: '',
        altura_max: '',
        peso_min: '',
        peso_max: '',
        anosVida: '',
        temperaments:[],
        imagen:''
    })

    const [formIsTouched, setFormIsTouched] = useState(false);
    useEffect(()=>{
        if(formIsTouched){

            if (newDog.altura_min.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    altura_min: 'El campo es requerido'
                }));
            }else if(!/^[1-9]\d*$/.test(Number(newDog.altura_min)) ){
                setErrors((prevErrors) => ({ 
                    ...prevErrors,
                    altura_min: 'Debe ser un numero mayor a cero'
                }));
            }else if(Number(newDog.altura_min) > Number(newDog.altura_max)){ // minimo > max no tiene sentido
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    altura_min: 'La altura minima no puede ser mayor que la maxima'
                }));
            }else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    altura_min: '' // LimpiO el mensaje de error
                }));
            }
        

        
            if (newDog.peso_min.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    peso_min: 'El campo es requerido'
                }));
            }else if(!/^[1-9]\d*$/.test(Number(newDog.peso_min)) ){
                setErrors((prevErrors) => ({ 
                    ...prevErrors,
                    peso_min: 'Debe ser un numero mayor a cero'
                }));
            }else if(Number(newDog.peso_min) > Number(newDog.peso_max)){ // minimo > max no tiene sentido
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    peso_min: 'El peso minimo no puede ser mayor que el maximo'
                }));
            }else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    peso_min: '' // LimpiO el mensaje de error
                }));
            }
        }
        
    },[newDog.altura_min, newDog.altura_max, newDog.peso_min, newDog.peso_max])
    
    
    const [errors, setErrors] = useState({
        nombre:'',
        altura_min: '',
        altura_max: '',
        peso_min: '',
        peso_max: '',
        anosVida: '',
        temperaments:'',
        imagen:''
    })
    
    
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    

    function handleTemperamentSelection(event) { // esto podria tenerlo dentro de un controllador
        const selectedTemperament = event.target.value;
        
        let updatedTemperaments; // esto es para tener actualizado los Temperaments
        
        // LOGICA PARA AGREGAR Y SACAR AL MOMENTO DE TILDAR //
        if (selectedTemperaments.includes(selectedTemperament)) {
            updatedTemperaments = selectedTemperaments.filter(temp => temp !== selectedTemperament);
            
        } else {
            updatedTemperaments = [...selectedTemperaments, selectedTemperament];
        }
        
        if (updatedTemperaments.length === 0) {
            setErrors(prevErrors => ({
              ...prevErrors,
              temperaments: "Debes seleccionar al menos un temperamento"
            }));
          } else {
            setErrors(prevErrors => ({
              ...prevErrors,
              temperaments: "" // Limpiamos el mensaje de error si es válido
            }));
          }

        setSelectedTemperaments(updatedTemperaments);
        setNewDog({
          ...newDog,
          temperaments: updatedTemperaments
        });


    }
    

    function validateForm(event){
        const {name,value} = event.target;

        if (name === 'nombre') {
            if (value.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    nombre: 'El campo es requerido'
                }));
            } else if (!/^[A-Za-z]{3,22}$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nombre: 'Debe tener entre 3 y 22 letras'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nombre: '' // LimpiO el mensaje de error
                }));
            }
        }

        if(name == 'altura_min'){
            if (value.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    altura_min: 'El campo es requerido'
                }));
            }else if(!/^[1-9]\d*$/.test(Number(value)) ){
                setErrors((prevErrors) => ({ 
                    ...prevErrors,
                    altura_min: 'Debe ser un numero mayor a cero'
                }));
            }else if(Number(value) > Number(newDog.altura_max)){ // minimo > max no tiene sentido
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    altura_min: 'La altura minima no puede ser mayor que la maxima'
                }));
            }else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    altura_min: '' // LimpiO el mensaje de error
                }));
            }
        }
        
        if(name == 'altura_max'){
            if (value.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    altura_max: 'El campo es requerido'
                }));
            }else if(!/^[1-9]\d*$/.test(Number(value))){
                setErrors((prevErrors) => ({ 
                    ...prevErrors,
                    altura_max: 'Debe ser un numero mayor a cero'
                }));
            }else if(Number(value) < Number(newDog.altura_min)){ // minimo > max no tiene sentido
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    altura_max: 'La altura maxima no puede ser menor que el minimo'
                }));
            }else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    altura_max: '' // LimpiO el mensaje de error
                }));
            }
        }

        if(name == 'peso_min'){
            if (value.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    peso_min: 'El campo es requerido'
                }));
            }else if(!/^[1-9]\d*$/.test(Number(value)) ){
                setErrors((prevErrors) => ({ 
                    ...prevErrors,
                    peso_min: 'Debe ser un numero mayor a cero'
                }));
            }else if(Number(value) > Number(newDog.peso_max)){ // minimo > max no tiene sentido
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    peso_min: 'El peso minimo no puede ser mayor que el maximo'
                }));
            }else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    peso_min: '' // LimpiO el mensaje de error
                }));
            }
        }
        
        if(name == 'peso_max'){
            if (value.trim() === '') {
                setErrors((prevErrors) => ({ // esta funcion flecha asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    peso_max: 'El campo es requerido'
                }));
            }else if(!/^[1-9]\d*$/.test(Number(value))){
                setErrors((prevErrors) => ({ 
                    ...prevErrors,
                    peso_max: 'Debe ser un numero mayor a cero'
                }));
            }else if(Number(value) < Number(newDog.peso_min)){ // max < min no tiene sentido
                setErrors((prevErrors) => ({ // esta funcion asegura que estoy accediendo al valor actualizado de errors
                    ...prevErrors,
                    peso_max: 'El peso maximo no puede ser menor que el minimo'
                }));
            }else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    peso_max: '' // LimpiO el mensaje de error
                }));
            }
        }

        if (name === 'anosVida') {
            const [min, max] = value.split('-').map((value) => value.trim());
            
            if (!/^\d+$/.test(min) || !/^\d+$/.test(max)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    anosVida: 'Ambos valores deben ser números enteros.',
                }));
            } else {
                const minValue = parseInt(min);
                const maxValue = parseInt(max);
            
                if (minValue > maxValue) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        anosVida: 'El valor mínimo no puede ser mayor que el máximo.',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        anosVida: '', // LimpiO el mensaje de error
                    }));
                }
            }
        }

        if(name == 'imagen'){ 
            // La imagen debe ser una URL válida que termine en .png, .jpg, .jpeg o .gif.
            if(!/^(https?):\/\/[^\s/$.?#].[^\s]*\.(?:png|jpe?g|gif|bmp|webp|svg|tiff)(\?.*)?$/i.test(value)){
                setErrors( prevErrors => ({
                    ...prevErrors,
                    imagen : "El formato o la imagen no es valido"
                }))
            }else{
                setErrors(prevErrors => ({
                    ...prevErrors,
                    imagen: "" // Limpiamos el mensaje de error si es válido
                }));
            }
        }
        
    }
    

    function handleChange(event){ 
        setFormIsTouched(true) // esto es necesario porque sino valida al principio cuando no hay nada
        setNewDog({
            ...newDog,
            [event.target.name] : event.target.value
        })
        validateForm(event)


    }

    function hasErrors() {
        console.log('hasErrors:',errors)
        return Object.values(errors).some(error => error !== '');
    }

    function handleSubmit(event){
        event.preventDefault()
        
        dispatch(createDog(newDog))
        setNewDog(
            {nombre:'',
        altura_min: '',
        altura_max: '',
        peso_min: '',
        peso_max: '',
        anosVida: '',
        temperaments:[],
        imagen:''}
        )
        setFormIsTouched(false)
    }
    return (
    <div>

        <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input 
                type="text"
                value={newDog.nombre}
                name="nombre"
                placeholder="Ingresa un nombre"
                onChange={handleChange}
                />
                {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>  }
            <br/>
            <label>Altura minima:</label>
            <input 
                type="text"
                value={newDog.altura_min}
                name="altura_min"
                placeholder="Ingresa una altura minima"
                onChange={handleChange}
            />
            {errors.altura_min && <p style={{ color: 'red' }}>{errors.altura_min}</p>  }
            <br/>
            <label>Altura maxima:</label>
            <input 
                type="text"
                value={newDog.altura_max}
                name="altura_max"
                placeholder="Ingresa una altura maxima"
                onChange={handleChange}
            />
            {errors.altura_max && <p style={{ color: 'red' }}>{errors.altura_max}</p>  }
            <br/>
            <label>Peso minimo:</label>
            <input 
                type="text"
                value={newDog.peso_min}
                name="peso_min"
                placeholder="Ingresa un peso minimo"
                onChange={handleChange}
            />
            {errors.peso_min && <p style={{ color: 'red' }}>{errors.peso_min}</p>  }
            <br/>
            <label>Peso maximo:</label>
            <input 
                type="text"
                value={newDog.peso_max}
                name="peso_max"
                placeholder="Ingresa un peso maximo"
                onChange={handleChange}
            />
            {errors.peso_max && <p style={{ color: 'red' }}>{errors.peso_max}</p>  }
            <br/>
            <label>anosVida:</label>
            <input 
                type="text"
                value={newDog.anosVida}
                name="anosVida"
                placeholder="(ejemplo: 1 - 10)"
                onChange={handleChange}
            />
            {errors.anosVida && <p style={{ color: 'red' }}>{errors.anosVida}</p>  }
            <br/>
            Tipos: 
            <br/>
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
            {errors.temperaments && <p style={{ color: 'red' }}>{errors.temperaments}</p>  }
            <label>Imagen:</label>
            <input 
                type="text"
                value={newDog.imagen}
                name="imagen"
                placeholder="Ingresa una imagen"
                onChange={handleChange}
            />
            {errors.imagen && <p style={{ color: 'red' }}>{errors.imagen}</p>  }
            <br/>

            {!hasErrors() && <button >Enviar formulario</button>}
            {hasErrors() && <p>Corrige los errores antes de enviar el formulario.</p>}
    
            
        </form>
    </div>
)
}

export default CreateDog