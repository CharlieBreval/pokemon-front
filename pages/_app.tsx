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

let client: ApolloClient<any> | null = null;

// export const referenceKeyExtractor = (reference: Reference): string =>
//   reference.__ref;

// export const checkIncomingContainsReferences = (
//   incoming: unknown[],
//   query: string
// ) => {
//   incoming.forEach((i) => {
//     if (!isReference(i)) {
//       throw new Error(
//         `[ApolloClient] ${query} should receive references instead of ${JSON.stringify(
//           i
//         )}`
//       );
//     }
//   });
// };

// export const mergeSimpleObjects =
//   (context: string) =>
//   (existing = [], incoming: Reference[]) => {
//     checkIncomingContainsReferences(incoming, context);
//     const merged = [...existing, ...incoming];
//     return uniqBy(merged, referenceKeyExtractor);
//   };

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
                // Concatenate the incoming list items with
                // the existing list items.
                merge(existing = [], incoming) {
                  return [...existing, ...incoming];
                },
              },
            },
          },
        },
      }),
      //   {
      //   typePolicies: {
      //     Query: {
      //       fields: {
      //         paginatedPokemons: {
      //           // Concatenate the incoming list items with
      //           // the existing list items.
      //           merge(existing = [], incoming) {
      //             return [...existing, ...incoming];
      //           },
      //         },
      //       },
      //     },
      //     // Pokemon: {
      //     //   fields: {
      //     //     name: {
      //     //       read(name) {
      //     //         // Return the cached name, transformed to upper case
      //     //         return name.toUpperCase();
      //     //       },
      //     //     },
      //     //   },
      //     // },
      //   },
      // }
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
