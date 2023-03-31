import { useQuery } from "@apollo/client";
import React from "react";
import GET_PAGINATED_POKEMONS from "./graphql/getPaginatedPokemons.gql";
import styles from "@/styles/Home.module.css";

type PaginatedPokemonListProps = {};

export const PaginatedPokemonList = ({}: PaginatedPokemonListProps) => {
  const { data, fetchMore } = useQuery(GET_PAGINATED_POKEMONS, {
    variables: {
      offset: 0,
      limit: 10,
    },
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
          fetchMore({
            variables: {
              offset: 10,
            },
          });
        }}
      >
        Fetch more paginated pokemons
      </button>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};
