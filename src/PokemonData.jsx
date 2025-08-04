function PokemonData({ data, species }) {
  return (
    <>
      <h2>
        {data.name.toUpperCase()} (ID: {data.id})
      </h2>
      <img src={data.sprites.front_default} alt="imagem do pokemon" />

      <p>
        <strong>Tipo:</strong> {data.types.map((t) => t.type.name).join(", ")}
      </p>
      <p>
        <strong>Altura:</strong> {data.height} cm
      </p>
      <p>
        <strong>Peso:</strong> {data.weight / 10} kg
      </p>
      <p>
        <strong>XP Base:</strong> {data.base_experience}
      </p>
      <p>
        <strong>Habilidades:</strong>
      </p>
      <ul>
        {data.abilities.map((a) => (
          <li key={a.ability.name}>
            {a.ability.name} (slot {a.slot}){a.is_hidden && " - Oculta"}
          </li>
        ))}
      </ul>

      <h3>Estatísticas</h3>
      <ul>
        {data.stats.map((d) => (
          <li key={d.stat.name}>
            {d.stat.name}: {d.base_stat}
          </li>
        ))}
      </ul>

      <h3>Índices de Jogo</h3>
      <ul className="list-indices">
        {data.game_indices.map((i, position) => (
          <li className="line-indice" key={position}>
            Versão: {i.version.name} - Índice: {i.game_index}
          </li>
        ))}
      </ul>

      <h3>Espécie</h3>
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
    </>
  );
}

export default PokemonData;
