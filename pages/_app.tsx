import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
} from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:4000/",
      }),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              paginatedPokemons: {
                // Don't cache separate results based on
                // any of this field's arguments.
                keyArgs: false,

                // Concatenate the incoming list items with
                // the existing list items.
                merge(existing = [], incoming) {
                  return [...existing, ...incoming];
                },
              },
            },
          },
          Pokemon: {
            fields: {
              name: {
                read(name) {
                  // Return the cached name, transformed to upper case
                  return name.toUpperCase();
                },
              },
            },
          },
        },
      }),
    });
  }

  return client;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
