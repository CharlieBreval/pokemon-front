import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  Reference,
  isReference,
} from "@apollo/client";
import Head from "next/head";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:4000/",
      }),
      // cache: new InMemoryCache({}),
      cache: new InMemoryCache({
        typePolicies: {
          Pokemon: {
            fields: {
              name: {
                read(name) {
                  return name.toUpperCase();
                },
              },
            },
          },
          Query: {
            fields: {
              paginatedPokemons: {
                merge(existing = [], incoming) {
                  return [...existing, ...incoming];
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
