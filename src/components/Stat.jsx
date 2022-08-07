import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress, Grid } from '@mui/material';

export const Stat = ({ name, value }) => {
  return (
    <Grid item>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>{name}</Typography>

        <CircularProgress
          variant='determinate'
          value={
            name !== 'Weight' && name !== 'Height' ? (value / 250) * 100 : 0
          }
          size={60}
        />

        <Box
          sx={{
            position: 'relative',
            top: -46,
          }}
        >
          <Typography variant='h6'>
            {name === 'Weight'
              ? `${value / 10} kg`
              : name === 'Height'
              ? `${value / 10} m`
              : value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
