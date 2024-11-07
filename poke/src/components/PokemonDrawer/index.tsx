import React, { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Pokemon } from "../../types/Pokemon";

interface PokemonDrawerProps {
  pokemon: Pokemon | null;
  open: boolean;
  onClose: () => void;
}

const PokemonDrawer: React.FC<PokemonDrawerProps> = ({
  pokemon,
  open,
  onClose,
}) => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const [disliked, setDisliked] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");

  if (!pokemon) return null;

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
  };
  const handleDislike = () => {
    setLiked(false);
    setDisliked(true);
  };

  const handleFeedbackSubmit = () => {
    // Exemplo de requisição de envio de feedback
    fetch("https://6723fb74493fac3cf24cd48c.mockapi.io/api/v1/pokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomePokemon: pokemon.name,
        idPokemon: pokemon.id,
        comentarioPokemon: comment,
        likeDislike: liked,
        gitHubId: "seuGitHubId", // Substitua pelo seu GitHub ID
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Feedback enviado com sucesso!");
          setComment("");
          setLiked(null);
        } else {
          alert("Erro ao enviar feedback.");
        }
      })
      .catch((error) => alert("Erro ao enviar feedback: " + error));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 16 }}>
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" gutterBottom>
          {pokemon.name}
        </Typography>

        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          style={{ width: "100%", borderRadius: 8 }}
        />

        <Divider style={{ margin: "16px 0" }} />

        <Typography variant="h6">Detalhes</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Tipo(s)" secondary={pokemon.types} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Altura" secondary={`${pokemon.height} cm`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Peso" secondary={`${pokemon.weight} kg`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Experiência Base"
              secondary={pokemon.base_experience}
            />
          </ListItem>
        </List>

        <Divider style={{ margin: "16px 0" }} />

        <Typography variant="h6">Habilidades</Typography>
        <Typography>
          {pokemon.abilities
            ? pokemon.abilities.map((ability, index) => (
                <span key={index}>
                  {ability}
                  {index < pokemon.abilities.length - 1 ? ", " : ""}
                </span>
              ))
            : "N/A"}
        </Typography>

        <Divider style={{ margin: "16px 0" }} />

        <Typography variant="h6">Interações</Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Button
            variant={liked === true ? "contained" : "outlined"}
            color="primary"
            onClick={handleLike}
            startIcon={<ThumbUpIcon />}
          >
            Like
          </Button>
          <Button
            variant={liked === false ? "contained" : "outlined"}
            color="secondary"
            onClick={handleDislike}
            startIcon={<ThumbDownIcon />}
          >
            Dislike
          </Button>
        </div>

        <div style={{ marginTop: 16 }}>
          <Typography variant="body2">Deixe um comentário:</Typography>
          <textarea
            style={{ width: "100%", padding: 8, borderRadius: 4, marginTop: 8 }}
            placeholder="Escreva aqui seu comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFeedbackSubmit}
          style={{ marginTop: 16, width: "100%" }}
          disabled={!disliked && !liked && !comment}
        >
          Enviar Feedback
        </Button>
      </div>
    </Drawer>
  );
};

export default PokemonDrawer;
