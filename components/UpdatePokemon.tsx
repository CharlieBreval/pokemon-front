import { useMutation } from "@apollo/client";
import React from "react";
import UPDATE_POKEMON from "./graphql/updatePokemon.gql";

type UpdatePokemonProps = { id: number; name: string };

export const UpdatePokemon = ({ id, name }: UpdatePokemonProps) => {
  const [mutatePokemon, { data, loading, error }] = useMutation(UPDATE_POKEMON);

  return (
    <button
      onClick={() => {
        mutatePokemon({
          variables: {
            id,
            name,
          },
        });
      }}
    >
      {`Pokemon ${id} becomes ${name}`}
    </button>
  );
};
