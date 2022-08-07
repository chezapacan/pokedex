import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Pokemon } from './pages/Pokemon';
import { selectSearch } from './redux/selectors';
import { getPokemon } from './redux/slices/pokemonSlice';

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectSearch);
  useEffect(() => {
    dispatch(getPokemon());
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Main pokemon={pokemon} />} />
          <Route path=':pokemonId' element={<Pokemon />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
