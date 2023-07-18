import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from './components/CardsContainer';
import { filterByOrder, filterByOrigin,  filterByTemperament, filterByWeigth, getDogByRaza, getDogs, getTemperaments } from './redux/actions';
import Detail from './components/Detail';
import CreateDog from './components/CreateDog';

function App() {
  const dispatch = useDispatch();

  const allDogs = useSelector( state => state.allDogs);
  const allTemperaments = useSelector(state => state.allTemperaments)
  
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const [toSearch, setToSearch] = useState('')
  
  useEffect( () => {
    dispatch(getDogs())
    dispatch(getTemperaments());
  },[])

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
    <main>
      {/* <div >
      <input
        type="text"
        placeholder="Search a dog..."
        value={toSearch}
        onChange={(e) => setToSearch(e.target.value)}
      />
      <button type="submit" onClick={searchDog}>
        <span className="material-icons">search</span>
      </button>
    </div>
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
          <option value='A'> Ascendente</option>
          <option value="D"> Descendente</option>
        </select>
    </div>

    <div>
      Ordenar por peso
        <select onChange={handleWeigth}>
          <option value='A'> Mas liviano</option>
          <option value="D"> Mas pesado</option>
        </select>
    </div>

      Temperamentos:
      <br/>
      <div>
        {allTemperaments.map( temp => {
          return <label key={temp.id}>
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
      <div>
        <button onClick={handleTemperament}> FILTRAR TEMPS</button>
      </div>

      </div> */}

  
      <Routes>
        <Route path='/dogs' element={<CardsContainer allDogs = {allDogs}/>}/> 
        <Route path='/detail/:id' element = {<Detail/>}/> 
        <Route path='/create' element={<CreateDog allTemperaments={allTemperaments}/>}/>
      
      </Routes>
    </main>
  )
}

export default App
