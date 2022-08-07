import React from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPokemonChain } from '../redux/slices/pokemonSlice';
import { useState } from 'react';
import { CardItem } from './CardItem';

export const Chain = React.memo(({ id }) => {
  const dispatch = useDispatch();
  const eChain = useSelector((state) => state.pokemon.pokemonChain);
  const [chain, setChain] = useState([]);

  useEffect(() => {
    dispatch(getPokemonChain(id));
  }, [id]);

  useEffect(() => {
    if (eChain.species) {
      setChain([
        eChain.species,
        ...eChain.evolves_to?.map((e1) => e1.species),
        eChain.evolves_to[0]?.evolves_to[0]?.species,
      ]);
    }
  }, [eChain]);

  const chainItems = chain.map((e) => {
    if (e !== undefined) {
      const id = e.url.split('/')[6];
      return (
        <Grid item key={id}>
          <CardItem name={e.name} id={id} />
        </Grid>
      );
    }
  });

  return (
    <Grid justifyContent='space-around' container spacing={1}>
      {chainItems}
    </Grid>
  );
});
