import { useQuery } from "@apollo/client";
import GET_POKEMONS from "./graphql/getPokemons.gql";
import React from "react";
import styles from "@/styles/Home.module.css";
import { jsonHighlight } from "@/utils/jsonHighlight";

type PokemonListProps = {};

export const PokemonList = ({}: PokemonListProps) => {
  const { data, refetch } = useQuery(GET_POKEMONS, {
    context: {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
  });

  return (
    <div className={styles.card}>
      <button
        onClick={() => {
          refetch();
        }}
      >
        Refetch all pokemons
      </button>
      <br />

      <pre
        dangerouslySetInnerHTML={{
          __html: jsonHighlight(JSON.stringify(data, undefined, 2)),
        }}
      />
    </div>
  );
};
