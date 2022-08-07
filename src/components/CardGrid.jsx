import React, { useEffect, useState } from 'react';
import { CardItem } from './CardItem';
import { Container, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/slices/pokemonSlice';

export const CardGrid = ({ pokemon }) => {
  const dispatch = useDispatch();
  const { page, searchFilter } = useSelector((state) => state.pokemon);
  const [cardItems, setCardItems] = useState([]);

  useEffect(() => {
    if (pokemon?.length > 0) {
      setCardItems(() => {
        return [
          ...pokemon.slice(0, page + 20).map((e) => {
            return (
              <Grid item key={e.name}>
                <CardItem name={e.name} id={e.url.split('/')[6]} />
              </Grid>
            );
          }),
        ];
      });
    }
  }, [page, searchFilter, pokemon]);

  const handleNextPage = () => {
    dispatch(setPage(page + 20));
  };

  if (!pokemon.length) {
    return (
      <Typography variant='h2' sx={{ textAlign: 'center' }}>
        Pokemon not found
      </Typography>
    );
  }

  return (
    <Container>
      <Grid
        justifyContent='center'
        container
        spacing={1}
        sx={{ marginBottom: 2 }}
      >
        {cardItems}
      </Grid>
      {pokemon.length > 20 + page ? (
        <Button
          onClick={handleNextPage}
          variant='outlined'
          fullWidth
          sx={{
            marginBottom: 2,
          }}
        >
          SHOW MORE
        </Button>
      ) : null}
    </Container>
  );
};
