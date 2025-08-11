function PokemonData({ data, species }) {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center uppercase text-gray-800">
        {data.name.toUpperCase()} (ID: {data.id})
      </h2>

      <div className="flex justify-center">
        <img
          src={data.sprites.front_default}
          alt="imagem do pokemon"
          className="w-[300px] h-auto"
        />
      </div>

      <div className="space-y-2">
        <p>
          <strong>Tipo do pokemon:</strong>{" "}
          {data.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>Altura do pokemeon:</strong> {data.height} cm
        </p>
        <p>
          <strong>Peso:</strong> {data.weight / 10} kg
        </p>
        <p>
          <strong>XP Base:</strong> {data.base_experience}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-x1 font-semibold border-b pb-1">Habilidades:</p>
        <ul className="space-y-1">
          {data.abilities.map((a) => (
            <li key={a.ability.name} className="bg-gray-100 rounded p-2">
              {a.ability.name} (slot {a.slot}){a.is_hidden && " - Oculta"}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-x1 font-semibold border-b pb-1">Estatísticas</h3>
        <ul className="space-y-1">
          {data.stats.map((d) => (
            <li key={d.stat.name} className="bg-gray-100 rounded p-2">
              {d.stat.name}: {d.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-x1 font-semibold border-b pb-1">Índices de Jogo</h3>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {data.game_indices.map((i, position) => (
            <li
              className="bg-gray-100 border border-gray-300 rounded-md p-3 shadow-sm"
              key={position}
            >
              <strong> Versão:</strong> {i.version.name} <br />
              <strong>Índice:</strong> {i.game_index}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <h3 className="text-xl font-semibold mb-2">Espécie</h3>
        <p>
          <strong>Cor:</strong> {species.color.name}
        </p>
        <p>
          <strong>Felicidade Base:</strong> {species.base_happiness}
        </p>
        <p>
          <strong>Taxa de Captura:</strong> {species.capture_rate}
        </p>
        <p>
          <strong>Grupo de Ovos:</strong>{" "}
          {species.egg_groups.map((g) => g.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default PokemonData;
