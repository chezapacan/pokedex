import React from 'react';
import { CardGrid } from '../components/CardGrid';

export const Main = ({ pokemon }) => {
  return (
    <>
      <CardGrid pokemon={pokemon} />
    </>
  );
};
