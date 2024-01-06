import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { Image } from "~/Image";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const pokemon = await fetchPokemon();
  return json({
    pokemon,
  });
};
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 25; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  return Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      url: result.url,
      image: result.sprites["front_default"],
      type: result.types.map((type: any) => type.type.name).join(", "),
      id: result.id,
    }));
    return pokemon;
  });
};

export default function Index() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {pokemon.map((poke: any) => (
        <Link key={poke.id} to={`/pokemon/${poke.name}`} className="flex gap-8">
          <Image
            style={{ marginLeft: 0 }}
            url={`pokemon/${poke.name}`}
            data={poke}
          />
          <h2>{poke.name}</h2>
        </Link>
      ))}

      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
