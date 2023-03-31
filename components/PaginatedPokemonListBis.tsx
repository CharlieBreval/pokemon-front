import { useQuery } from "@apollo/client";
import React from "react";
import GET_PAGINATED_POKEMONS_BIS from "./graphql/getPaginatedPokemonsBis.gql";
import styles from "@/styles/Home.module.css";
import { jsonHighlight } from "@/utils/jsonHighlight";

type PaginatedPokemonListBisProps = {};

export const PaginatedPokemonListBis = ({}: PaginatedPokemonListBisProps) => {
  const { data, fetchMore } = useQuery(GET_PAGINATED_POKEMONS_BIS, {
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
        Fetch more paginated pokemons bis
      </button>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};
