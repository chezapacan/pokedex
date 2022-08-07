import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './slices/pokemonSlice';

export default configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});
