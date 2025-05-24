import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpsLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetch,
});

export const client = new ApolloClient({
  link: httpsLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});
