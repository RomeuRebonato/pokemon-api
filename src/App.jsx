import { useState } from "react";
import "./App.css";
import PokemonData from "./PokemonData";

function App() {
  const [name, setName] = useState(null);
  const [data, setData] = useState(null);
  const [SpeciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState(null);

  function fetchPokemon(name) {
    setError(null);
    setData(null);
    setSpeciesData(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((response1) => {
        if (!response1.ok) {
          throw new Error("Erro na busca do Pokémon");
        }
        return response1.json();
      })
      .then((data1) => {
        setData(data1);
        return fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`
        );
      })
      .then((response2) => {
        if (!response2.ok)
          throw new Error("Erro na busca dos dados da espécie");
        return response2.json();
      })
      .then((data2) => {
        setSpeciesData(data2);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      fetchPokemon(name.trim());
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "Arial, sans-serif" }}>Buscar Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do Pokémon"
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && SpeciesData && <PokemonData data={data} species={SpeciesData} />}
    </div>
  );
}

export default App;
