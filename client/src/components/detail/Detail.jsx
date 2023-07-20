import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect} from 'react';

import './detail.css'

const Detail = () => {
  const {id} = useParams()
  const [dogDetail, setDogDetail] = useState({});
  // no uso redux ya que no necesito compartir la informacion de detalle en otros componentes,solo se va a usar aca esta informacion
  
  useEffect(()=>{
    axios.get(`http://localhost:3001/dogs/${id}`)
    .then(({data}) => {
      console.log(data)
      setDogDetail(data)
    })
    .catch(error => console.log('errorDetail:',error.response.data.error)) 
    // aca deberia venir el error del back en teoria 
    /// ahora si, estaba todo dentro de un objeto 
    // deberia mostrarlo renderizarlo
    
    
  },[id])

  return (
    <div className='detail-container'>
      <img src={dogDetail.imagen && dogDetail.imagen} alt="" />
            <h1>Nombre: {dogDetail.nombre && dogDetail.nombre}</h1>
            <h2>Alturamin: {dogDetail.altura_min && dogDetail.altura_min}</h2>
            <h2>Pesomin: {dogDetail.peso_min && dogDetail.peso_min}</h2>
            <h2>Alturamax: {dogDetail.altura_max && dogDetail.altura_max}</h2>
            <h2>Pesomax: {dogDetail.peso_max && dogDetail.peso_max}</h2>
            <h2>Temperamentos: {dogDetail.temperaments?.length > 0 ? dogDetail.temperaments.map(temp => temp).join(',') :"sin-temperamentos"}</h2>
            <h2>AnosVida: {dogDetail.anosVida && dogDetail.anosVida}</h2>
    </div>
  )
}

export default Detail