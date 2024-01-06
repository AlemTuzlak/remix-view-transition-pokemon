import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import {
  Link,
  unstable_useViewTransitionState,
  useLoaderData,
} from "@remix-run/react";
import { Image } from "~/Image";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// Function to get information about a Pokemon and its forms
async function getPokemonInfo(pokemonName: string) {
  try {
    // Make a request to get information about the specified Pokemon
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`
    );
    const pokemonData = await pokemonResponse.json();

    return {
      name: pokemonData.name,
      url: pokemonData.url,
      image: pokemonData.sprites["front_default"],
      type: pokemonData.types.map((type: any) => type.type.name).join(", "),
      id: pokemonData.id,
    };
  } catch (error) {
    console.error(`Error: ${(error as any).message}`);
  }
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const info = await getPokemonInfo(params.pokemon!);

  return json({ info });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Link to={"/"} unstable_viewTransition>
        <Image url={`/`} style={{ height: "300px" }} data={data.info} />
      </Link>
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
