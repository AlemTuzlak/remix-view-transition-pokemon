import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import {
  unstable_useViewTransitionState,
  useLoaderData,
} from "@remix-run/react";
import { ImageWithTransition } from "~/components/ImageWithTransition";
import { getPokemonInfo } from "~/pokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const pokemon = await getPokemonInfo(params.pokemon!);

  return json({ pokemon });
};

export default function Index() {
  const { pokemon } = useLoaderData<typeof loader>();
  const isTransitioningToMain = unstable_useViewTransitionState(`/`);
  const isGoingBack = unstable_useViewTransitionState(
    `/pokemon/${pokemon?.name}`
  );
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <hr className="mt-8 mb-8" />
      <h1 className="text-4xl font-bold text-center">{pokemon?.name}</h1>
      <hr className="mt-8" />
      {!isTransitioningToMain && !isGoingBack && (
        <ImageWithTransition
          to={`/pokemon/${pokemon?.name}/info`}
          style={{
            height: "300px",
          }}
          transitionName={pokemon?.name}
          src={pokemon?.image!}
        />
      )}
    </div>
  );
}
