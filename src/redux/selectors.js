import { createSelector } from '@reduxjs/toolkit';

export const selectPokemon = (state) => state.pokemon.pokemon;
const search = (state) => state.pokemon.searchFilter;

export const selectSearch = createSelector(
  [selectPokemon, search],
  (allPokemon, searchFilter) => {
    if (!searchFilter) return allPokemon;

    return allPokemon.filter((p) =>
      p.name.split('-')[0].includes(searchFilter.toLowerCase())
    );
  }
);
