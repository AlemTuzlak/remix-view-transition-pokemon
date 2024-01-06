const getPokemonImage = (id: string) => {
  const pokemonId = `00${id}`.slice(-3);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`;
};

const getEvolutionInfo = (evolution: any) => {
  const evolutionName = evolution.species.name;
  const evolutionUrl = evolution.species.url;
  const evolutionId = evolutionUrl.split("/")[6];
  const evolutionImage = getPokemonImage(evolutionId);

  return {
    ...evolution,
    name: evolutionName,
    url: evolutionUrl,
    image: evolutionImage,
  };
};

export const getEvolutionChain = async (url: string) => {
  const evolutionChainResponse = await fetch(url);
  const evolutionChainData = await evolutionChainResponse.json();
  const evolutions = [];
  let currentEvolution = getEvolutionInfo(evolutionChainData.chain);

  evolutions.push(currentEvolution);
  while (currentEvolution.evolves_to.length > 0) {
    currentEvolution = getEvolutionInfo(currentEvolution.evolves_to[0]);
    evolutions.push(currentEvolution);
  }
  return evolutions;
};

export const getEvolutionChains = async (url: string) => {
  const evolutionChainResponse = await fetch(url);
  const { results } = await evolutionChainResponse.json();

  const evolutions = (await Promise.all(
    results.map(async (result: any) => {
      const evolutions = await getEvolutionChain(result.url);

      return evolutions;
    })
  )) as { name: string; url: string; image: string }[][];

  return evolutions;
};

export const fetchEvolutions = async () => {
  const evolutions = await getEvolutionChains(
    "https://pokeapi.co/api/v2/evolution-chain"
  );
  // these don't have images
  return evolutions.filter(
    (evo, i) => i !== 9 && i !== 13 && i !== 15 && i !== 16
  );
};

// Function to get information about a Pokemon and its forms
export const getPokemonInfo = async (pokemonName: string) => {
  try {
    // Make a request to get information about the specified Pokemon
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`
    );
    const pokemonData = await pokemonResponse.json();
    const species = pokemonData.species.url;
    const speciesResponse = await fetch(species);
    const speciesData = await speciesResponse.json();
    const evolutionChain = speciesData.evolution_chain.url;
    const evolutions = await getEvolutionChain(evolutionChain);

    return {
      name: pokemonData.name,
      url: pokemonData.url,
      image: getPokemonImage(pokemonData.id),
      type: pokemonData.types.map((type: any) => type.type.name).join(", "),
      evolutions,
      id: pokemonData.id,
    };
  } catch (error) {
    console.error(`Error: ${(error as any).message}`);
  }
};

export type Pokemon = Awaited<ReturnType<typeof getPokemonInfo>>;
export type PokemonEvolutionChain = Awaited<
  ReturnType<typeof getEvolutionChain>
>;
export type PokemonEvolutionChains = Awaited<
  ReturnType<typeof getEvolutionChains>
>;
