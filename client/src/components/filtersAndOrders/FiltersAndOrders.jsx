import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './filtersAndOrders.css'
import { filterByOrder, filterByOrigin,  filterByTemperament, filterByWeigth, getDogByRaza, getDogs, getTemperaments } from '../../redux/actions';


const FiltersAndOrders = ({allDogs,allTemperaments}) => {
    const dispatch = useDispatch();

  
  
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const [toSearch, setToSearch] = useState('')
  
  

  function handleTemperament(){
    dispatch(filterByTemperament(selectedTemperaments))
  }

  
  function handleTemperamentSelection(event){ // lo llevo a un controlador?
    const selectedTemperament = event.target.value // viene de a uno
    let updatedTemperaments
    //con 's' al final es el arreglo q contiene lo q voy a seleccionar
    
    //logica para agergar y sacar al momento de tildar
    if(selectedTemperaments.includes(selectedTemperament)){
      updatedTemperaments = selectedTemperaments.filter(temp => temp != selectedTemperament)
    }else{
      updatedTemperaments = [...selectedTemperaments,selectedTemperament]
    }
    
    setSelectedTemperaments(updatedTemperaments)
  }
  
  
  function handleOrigin(event){
    dispatch(filterByOrigin(event.target.value))
  }


  function searchDog(event){
    dispatch(getDogByRaza(toSearch))
  }


  function handleOrder(event){
    dispatch(filterByOrder(event.target.value))
  }

  function handleWeigth(event){
    dispatch(filterByWeigth(event.target.value))
  }
  return (
    <section className='section-container'>

    <div className='search-container'>
        <input
            type="text"
            placeholder="Search a dog..."
            value={toSearch}
            onChange={(e) => setToSearch(e.target.value)}
        />
        <button className='button-search' type="submit" onClick={searchDog}>
            <span >search</span>
        </button>
    </div>
        
    <div className='filters'>
            <div>
            Ordenar por origen
                <select onChange={handleOrigin}>
                <option value='ALL'> Todos</option>
                <option value="API">API</option>
                <option value="DB">DataBase</option>
                </select>
        </div>

        <div>
            Ordenar por nombre
                <select onChange={handleOrder}>
                <option value='A'> A-Z</option>
                <option value="D"> Z-A</option>
                </select>
        </div>

        <div>
            Ordenar por peso
                <select onChange={handleWeigth}>
                <option value='A'> Mas liviano</option>
                <option value="D"> Mas pesado</option>
                </select>
        </div>
    </div>
    

      
      <div className='temperaments-container'>
      
        {allTemperaments.map( temp => {
          return <label className='temperament-checkbox' key={temp.id}>
            {temp.nombre}
            <input
              type = 'checkbox'
              name = 'temperaments'
              value = {temp.nombre}
              checked = {selectedTemperaments?.includes(temp.nombre)} // true o false
              onChange = {handleTemperamentSelection}
            />
          </label>
        })}
        <button className =' button-temps'onClick={handleTemperament}> FILTRAR TEMPS</button>
      

      </div>
    </section>
  )
}

export default FiltersAndOrders