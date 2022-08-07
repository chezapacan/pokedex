import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export const CardItem = ({ name, id }) => {
  const defaultImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return (
    <Link to={`/${id}`}>
      <Card sx={{ maxWidth: 200, minWidth: 200 }}>
        <CardActionArea>
          <CardMedia component='img' height='200' image={defaultImg} />
          <CardContent>
            <Typography variant='h7' color='text.secondary'>
              {'#' + id.toString().padStart(3, '0')}
            </Typography>
            <Typography variant='h5' mt={-0.5}>
              {(name[0].toUpperCase() + name.slice(1)).split('-')[0]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
