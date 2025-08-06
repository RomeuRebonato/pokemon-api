import { useRef } from "react";
import PokemonData from "./PokemonData";
import { useQuery } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

function fetchPokemon(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    .then((response1) => {
      if (!response1.ok) throw new Error("Erro na busca do Pokémon");
      return response1.json();
    })
    .then((data1) =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`
      ).then((response2) => {
        if (!response2.ok)
          throw new Error("Erro na busca dos dados da espécie");
        return response2.json().then((data2) => ({
          data: data1,
          species: data2,
        }));
      })
    );
}

function Home() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const { data, error, isError, refetch } = useQuery({
    queryKey: ["pokemon-search"],
    queryFn: () => fetchPokemon(inputRef.current.value),
    enabled: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    refetch();
  }

  function handleClick() {
    if (data?.data?.name) {
      navigate(`/pokemon/${data.data.name}`);
    }
  }

  return (
    <div className="bg-blue-100 text-[#131313] font-sans p-8 min-h-screen">
      <h1 className="text-center text-gray-800 mb-4 text-4xl font-bold">
        Buscar Pokémon
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center flex-wrap gap-2 mb-8"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Digite o nome do Pokémon"
          className="p-2 rounded-md border border-white w-full max-w-[240px]"
        />
        <button
          type="submit"
          className="p-2 px-10 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-md w-full max-w-[120px]"
        >
          Buscar
        </button>
      </form>

      {isError && <p className="text-red-600 mb-4">{error.message}</p>}

      {data && (
        <div className="mt-6 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-center uppercase text-gray-800">
            {data.data.name.toUpperCase()} (ID: {data.id})
          </h2>
          <div className="flex justify-center">
            <img
              src={data.data.sprites.front_default}
              alt="Imagem do Pokémon"
              className="w-[300px] cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PaginaPokemon() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () => fetchPokemon(name),
  });

  if (isLoading) return <p className="text-center">Carregando...</p>;
  if (isError)
    return <p className="text-center text-red-600">{error.message}</p>;

  return (
    <div className="p-8 bg-blue-100 text-[#131313] font-sans min-h-screen">
      <button
        className="mb-6 px-4 py-2 bg-blue-300 hover:bg-gray-400 rounded font-semibold"
        onClick={() => navigate(-1)}
      >
        &#8656;
      </button>
      <PokemonData data={data.data} species={data.species} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PaginaPokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
