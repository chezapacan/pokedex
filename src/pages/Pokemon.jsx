import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPokemonInfo } from '../redux/slices/pokemonSlice';
import { Stat } from '../components/Stat';
import {
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Chain } from '../components/Chain';

export const Pokemon = ({}) => {
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const { pokemonInfo, typeColors, statusPokemonInfo } = useSelector(
    (state) => state.pokemon
  );
  const dispatch = useDispatch();
  const defaultImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;

  const typeChip = pokemonInfo.types?.map((e, index) => {
    return (
      <Chip
        key={index}
        label={e.type.name}
        size='small'
        sx={{ marginRight: '4px', background: typeColors[e.type.name] }}
      />
    );
  });

  useEffect(() => {
    dispatch(getPokemonInfo(pokemonId));
  }, [pokemonId]);

  const handleKey = (e) => {
    if (e.key === 'ArrowRight') {
      navigate(`/${pokemonInfo.id + 1}`);
    }
    if (e.key === 'ArrowLeft' && pokemonId > 1) {
      navigate(`/${pokemonInfo.id - 1}`);
    }
  };

  if (statusPokemonInfo === 'error') {
    return (
      <Typography variant='h2' sx={{ textAlign: 'center' }}>
        Invalid ID
      </Typography>
    );
  }

  return (
    <>
      {pokemonInfo.name ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onKeyDown={handleKey}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              sx={{
                marginRight: 1,
              }}
            >
              {
                (
                  pokemonInfo.name[0].toUpperCase() + pokemonInfo.name.slice(1)
                ).split('-')[0]
              }
            </Typography>
            <Typography variant='h4' color='text.secondary'>
              {'#' + pokemonInfo.id.toString().padStart(3, '0')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: 1,
            }}
          >
            {typeChip}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              zIndex: 2,
            }}
          >
            <Box sx={{ width: 100, marginBottom: 5 }}>
              {pokemonInfo.id > 1 ? (
                <Link to={`/${pokemonInfo.id - 1}`}>
                  <Button startIcon={<ArrowBackIcon />}>
                    <Typography variant='h6'>Prev</Typography>
                  </Button>
                </Link>
              ) : null}
            </Box>
            <img src={defaultImg} width='200' />
            <Box sx={{ width: 100, marginBottom: 5 }}>
              {pokemonInfo.id < 898 ? (
                <Link to={`/${pokemonInfo.id + 1}`}>
                  <Button endIcon={<ArrowForwardIcon />}>
                    <Typography variant='h6'>Next</Typography>
                  </Button>
                </Link>
              ) : null}
            </Box>
          </Box>

          <Paper
            sx={{
              top: -130,
              position: 'relative',
              paddingBottom: 2,
              paddingX: 2,
              zIndex: 1,
              maxWidth: 800,
            }}
            elevation={3}
          >
            <Grid
              container
              justifyContent='center'
              sx={{
                paddingTop: 18,
              }}
              spacing={5}
            >
              <Stat value={pokemonInfo.weight} name={'Weight'} />
              <Stat value={pokemonInfo.height} name={'Height'} />
              <Stat value={pokemonInfo.stats[0].base_stat} name={'HP'} />
              <Stat value={pokemonInfo.stats[1].base_stat} name={'Atk'} />
              <Stat value={pokemonInfo.stats[2].base_stat} name={'Def'} />
              <Stat value={pokemonInfo.stats[3].base_stat} name={'S-Atk'} />
              <Stat value={pokemonInfo.stats[4].base_stat} name={'S-Def'} />
              <Stat value={pokemonInfo.stats[5].base_stat} name={'Speed'} />
            </Grid>
            <Divider sx={{ marginBottom: 2 }}>
              <Typography>EVOLUTION CHAIN</Typography>
            </Divider>
            <Chain id={pokemonId} />
          </Paper>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
