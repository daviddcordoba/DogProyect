import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from './components/cardscontainer/CardsContainer';
import {getDogs, getTemperaments } from './redux/actions';
import Detail from './components/detail/Detail';
import CreateDog from './components/createdog/CreateDog';
import Landing from './components/landing/Landing';
import './App.css';
import FiltersAndOrders from './components/filtersAndOrders/FiltersAndOrders';

function App() {
  
  const dispatch = useDispatch();
  const location = useLocation();
  const allDogs = useSelector( state => state.allDogs);
  const allTemperaments = useSelector(state => state.allTemperaments)
  
  useEffect( () => {
    dispatch(getDogs())
    dispatch(getTemperaments());
  },[])
  
  return (
    <main>
      {/* Mostrar FiltersAndOrders solo en la ruta '/dogs' */}
      {location.pathname === '/dogs' && (
        <FiltersAndOrders allDogs={allDogs} allTemperaments={allTemperaments} />
      )}

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dogs' element={<CardsContainer allDogs={allDogs} />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<CreateDog allTemperaments={allTemperaments} />} />
      </Routes>
    </main>
  );
}

export default App;

