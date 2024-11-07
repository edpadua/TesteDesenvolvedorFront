import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Drawer, IconButton, Button, Box,  CircularProgress } from '@mui/material';
import { Pokemon } from '../../types/Pokemon';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import PokemonDrawer from '../PokemonDrawer/'

const PokemonList: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 50;


  
    const fetchPokemonList = async (page: number) => {
      try {
        

      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`);
      const basicPokemonList = response.data.results;

        // Mapear os dados básicos para obter os detalhes completos
        const detailedPokemonList = await Promise.all(
          basicPokemonList.map(async (pokemon: { name: string; url: string }) => {
            const pokemonDetails = await axios.get(pokemon.url);
            const data = pokemonDetails.data;
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.front_default,
              types: data.types.map((typeInfo: any) => typeInfo.type.name),
              height: data.height,
              weight: data.weight,
              abilities: data.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
              base_experience: data.base_experience,
            };
          })
        );

        setPokemonData(detailedPokemonList);
      } catch (error) {
        console.error("Erro ao buscar a lista de Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };



  useEffect(() => {
    fetchPokemonList(page);
  }, [page]);


  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleOpenDrawer = (
    pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedPokemon(null);
    setIsDrawerOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container spacing={2} >
        {pokemonData.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id} >
            <Card onClick={() => handleOpenDrawer(pokemon)} style={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography variant="h6">{pokemon.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>
          Página Anterior
        </Button>
        <Typography>Página {page}</Typography>
        <Button variant="contained" onClick={handleNextPage}>
          Próxima Página
        </Button>
      </Box>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <IconButton onClick={handleCloseDrawer}>
          <CloseIcon />
        </IconButton>
        {selectedPokemon && <PokemonDrawer pokemon={selectedPokemon} open={isDrawerOpen} 
  onClose={handleCloseDrawer}  />}
      </Drawer>
    </>
  );
};

export default PokemonList;