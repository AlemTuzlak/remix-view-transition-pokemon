import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { LinkAndImageTransition } from "~/components/LinkAndImageTransition";
import { PokemonEvolutionChains, fetchEvolutions } from "~/pokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "RemixDex" },
    { name: "description", content: "Welcome to RemixDex Evolutions!" },
  ];
};

let CachedEvolutions: { evolutions: PokemonEvolutionChains } | null = null;

export const loader = async () => {
  if (CachedEvolutions) return json(CachedEvolutions);
  const evolutions = await fetchEvolutions();
  CachedEvolutions = { evolutions };
  return json({
    evolutions,
  });
};

export default function Index() {
  const { evolutions } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <div className="flex gap-2 flex-wrap p-2 justify-evenly items-start h-[90vh] overscroll-y-auto">
        {evolutions.map((evolutions, i) => (
          <div
            key={i}
            className=" flex items-center w-[49%] justify-between rounded-md shadow-sm drop-shadow-lg border border-gray-100"
          >
            {evolutions.map((pokemon) => (
              <LinkAndImageTransition
                withTitle
                key={pokemon.name}
                to={`/pokemon/${pokemon.name}`}
                className="size-80 flex items-center justify-center flex-col gap-2 p-2"
                imgProps={{
                  src: pokemon.image,
                  transitionName: pokemon.name,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
