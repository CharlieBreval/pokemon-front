import { useQuery } from "@apollo/client";
import GET_DRESSEURS from "./graphql/getDresseurs.gql";
import React from "react";
import styles from "@/styles/Home.module.css";
import { jsonHighlight } from "@/utils/jsonHighlight";

type DresseurListProps = {};

export const DresseurList = ({}: DresseurListProps) => {
  const { data, refetch } = useQuery(GET_DRESSEURS, {
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
        Refetch DRESSEURS
      </button>

      <pre
        dangerouslySetInnerHTML={{
          __html: jsonHighlight(JSON.stringify(data, undefined, 2)),
        }}
      />
    </div>
  );
};
