import {Link} from 'react-router-dom';

const CardsContainer = ({allDogs}) => {

    return (
    <div>
        PERROS
      {allDogs.map((dog, index) => (
        <div key={index}>
          <Link to={`/detail/${dog.id}`}> {dog.nombre}  </Link>
          {dog.temperament?.map(temp=>{
            return <p key={temp.id}>{temp.nombre}</p>
          })}
          <img src={dog.imagen} width={'200px'} />
          </div>
      ))}
    </div>
  )
}

export default CardsContainer