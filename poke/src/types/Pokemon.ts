export interface Pokemon {
    id: number;
    name: string;
    image: string; // URL da imagem do Pokémon
    types: string[]; // Lista de tipos do Pokémon, como "Fire", "Water"
    height: number; // Altura em centímetros
    weight: number; // Peso em quilogramas
    base_experience: number; // Experiência base
    abilities: string[]; // Lista de habilidades do Pokémon
  }