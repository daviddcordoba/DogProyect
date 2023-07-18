import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect} from 'react';

const Detail = () => {
  const {id} = useParams()
  const [dogDetail, setDogDetail] = useState({});
  // no uso redux ya que no necesito compartir la informacion de detalle en otros componentes,solo se va a usar aca esta informacion
  
  useEffect(()=>{
    axios.get(`http://localhost:3001/dogs/${id}`)
    .then(({data}) => {
      setDogDetail(data)
    })
    .catch(error => console.log('errorDetail:',error.response.data.error)) 
    // aca deberia venir el error del back en teoria 
    /// ahora si, estaba todo dentro de un objeto 
    // deberia mostrarlo renderizarlo
    
    
  },[id])
  
  return (
    <div>dogDetailDetail
      <img src={dogDetail.imagen && dogDetail.imagen} alt="" />
            <h1>Nombre: {dogDetail.nombre && dogDetail.nombre}</h1>
            <h1>Alturamin: {dogDetail.altura_min && dogDetail.altura_min}</h1>
            <h1>Pesomin: {dogDetail.peso_min && dogDetail.peso_min}</h1>
            <h1>Alturamax: {dogDetail.altura_max && dogDetail.altura_max}</h1>
            <h1>Pesomax: {dogDetail.peso_max && dogDetail.peso_max}</h1>
            <h1>Temperamentos: {dogDetail.temperament?.length > 0 ? dogDetail.temperament.join(',') :"sin-temperamentos"}</h1>
            <h1>AnosVida: {dogDetail.anosVida && dogDetail.anosVida}</h1>
    </div>
  )
}

export default Detail