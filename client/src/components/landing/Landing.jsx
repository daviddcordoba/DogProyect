import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    const navigate = useNavigate()
  return (
    <div>
        <h1>¡Bienvenido a la mejor pagina de perros!</h1>
        <button onClick={()=>navigate('/dogs')}>Entrar</button>
    </div>
  )
}

export default Landing