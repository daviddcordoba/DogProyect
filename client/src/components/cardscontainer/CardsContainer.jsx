import { useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import './cardsContainers.css'
import { handleInicio } from './handleInicio';

const CardsContainer = ({allDogs}) => {
  const CARDS_PER_PAGE = 8;

  const [prev, setPrev] = useState(0)
  const [next, setNext] = useState(CARDS_PER_PAGE)
  const [count, setCount] = useState(1); //? para que haga el cambio de pagina

  let dogs = allDogs.slice(prev, next) //? para mostrar de 8 en 8    

  const totalPages = Math.ceil(allDogs.length / CARDS_PER_PAGE); //total de paginas que va a tener mi SPA

  const nextHandler = () => {
      if (count < totalPages) {
          setNext(next + CARDS_PER_PAGE); //? aumenta el valor de next para mostrar la siguiente pag
          setPrev(prev + CARDS_PER_PAGE); //? Aumenta el valor de 'prev' para mantener la coherencia de los perros mostrados en la página.
          setCount(count + 1);    //? Aumentamos el valor de 'count' para indicar la página actual.
      }
  }

  const prevHandler = () => {
      if (count > 1) {
          if (prev - CARDS_PER_PAGE <= 0) {   //esta verificacion es para cuando estemos en la primera pagina
              setPrev(0)  //? para que no se pueda seguir yendo para atras 
              setNext(CARDS_PER_PAGE) //? para mostrar los perros de la primer pag 
          }
          else if (prev - 12 >= 0) {  //esta verificacion es para cuando NO estemos en la primera pagina
              setPrev(prev - CARDS_PER_PAGE)  //? se reduce prev para saber si se puede seguir yendo para atras
              setNext(next - CARDS_PER_PAGE)  //? Aumentamos el valor de 'count' para indicar la página actual.
          }
          setCount(count - 1) //? se reduce el valor de count para indicar la nueav pagina actual
      }
  }

    return (
    <div className='cards-container'>
      {dogs.map((dog, index) => (
        <div className ='card' key={index}>
          
              <Link to={`/detail/${dog.id}`}> {dog.nombre}  </Link>
              <img src={dog.imagen} width={'200px'} alt={dog.nombre} />
              <h4>Altura:{dog.altura_min} - {dog.altura_max}</h4>
              <h4>Peso: {dog.peso_min} - {dog.peso_max}</h4>
              
              <div className='temperaments'>
                <h4>Temperamentos:</h4>
                {dog.temperaments?.map(temp=>{
                  return <h4 key={temp.id}>{temp}</h4>
                })}
        </div>
        <h4>Años vida:{dog.anosVida}</h4>

          </div>
      ))}

    <div className='pagination-container'>
            
                <button  onClick={prevHandler}>
                    {"<"}
                </button>

                <h3>{count} - {totalPages}</h3>

                <button onClick={nextHandler}>
                    {">"}
                </button>

                <button onClick={()=>handleInicio}>1</button>
        </div>
    </div>
  )
}

export default CardsContainer