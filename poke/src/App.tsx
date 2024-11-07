
import React, { useState } from 'react';
import { Container } from '@mui/material';
import PokemonList from './components/PokemonList';
import PokemonDrawer from './components/PokemonDrawer';

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

  return (
    <Container >
      <h2>Lista de Pokémons</h2>
      <PokemonList onSelect={(id) => setSelectedPokemon(id)} />
      
    </Container>
  );
};

export default App;

