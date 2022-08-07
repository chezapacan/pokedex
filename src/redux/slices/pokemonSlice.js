import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  blue,
  blueGrey,
  brown,
  deepPurple,
  green,
  grey,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';

const initialState = {
  pokemon: [],
  pokemonInfo: { id: 0 },
  pokemonChain: { id: 0 },
  typeColors: {
    normal: grey[300],
    fighting: orange[200],
    flying: blue[100],
    poison: lightGreen['A400'],
    ground: brown[200],
    rock: grey[400],
    bug: lime[400],
    ghost: deepPurple[200],
    steel: blueGrey[200],
    fire: red[300],
    water: blue[300],
    grass: green[300],
    electric: yellow[400],
    psychic: purple[300],
    ice: lightBlue[200],
    dragon: teal[300],
    dark: grey[500],
    fairy: pink[200],
  },
  statusPokemon: 'loading',
  statusPokemonInfo: 'loading',
  statusPokemonChain: 'loading',
  searchFilter: '',
  page: 0,
};

export const getPokemon = createAsyncThunk(
  'pokemon/getPokemon',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=898');
    return res.data.results;
  }
);

export const getPokemonInfo = createAsyncThunk(
  'pokemon/getPokemonInfo',
  async (pokemonID, { rejectWithValue, dispatch }) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    );
    return res.data;
  }
);

export const getPokemonChain = createAsyncThunk(
  'pokemon/getPokemonChain',
  async (pokemonID, { rejectWithValue, dispatch }) => {
    const species = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`
    );
    const evolutionChain = await axios.get(species.data.evolution_chain.url);
    return evolutionChain.data.chain;
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      state.searchFilter = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [getPokemon.pending]: (state) => {
      state.statusPokemon = 'loading';
    },
    [getPokemon.fulfilled]: (state, action) => {
      state.pokemon = action.payload;
      state.statusPokemon = 'done';
    },
    [getPokemon.rejected]: (state) => {
      state.statusPokemon = 'error';
    },

    [getPokemonInfo.pending]: (state) => {
      state.statusPokemonInfo = 'loading';
    },
    [getPokemonInfo.fulfilled]: (state, action) => {
      state.pokemonInfo = action.payload;
      state.statusPokemonInfo = 'done';
    },
    [getPokemonInfo.rejected]: (state) => {
      state.statusPokemonInfo = 'error';
    },

    [getPokemonChain.pending]: (state) => {
      state.statusPokemonChain = 'loading';
    },
    [getPokemonChain.fulfilled]: (state, action) => {
      state.pokemonChain = action.payload;
      state.statusPokemonChain = 'done';
    },
    [getPokemonChain.rejected]: (state) => {
      state.statusPokemonChain = 'error';
    },
  },
});

export const { changeSearch, setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
