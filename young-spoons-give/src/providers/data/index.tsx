import graphqlDataProvider, {
    GraphQLClient,
    liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws"; // Ensure this import exists
import { fetchWrapper } from "./fetch-wrappers";

// Constants
export const API_BASE_URL = "https://api.crm.refine.dev"; // Ensure the URL has no typos
export const API_URL = `${API_BASE_URL}/graphql` // Fixed missing colon in URL
export const WS_URL = "wss://api.crm.refine.dev/graphql"; // Ensure correct WebSocket URL

// GraphQL Client
export const client = new GraphQLClient(API_URL, {
    fetch: async (url: string, options: RequestInit) => {
        try {
            return await fetchWrapper(url, options);
        } catch (error) {
            return Promise.reject(error as Error); // Ensure proper error typing
        }
    },
});

// WebSocket Client
export const wsClient =
    typeof window !== "undefined"
        ? createClient({
              url: WS_URL,
              connectionParams: () => {
                  const accessToken = localStorage.getItem("access_token");
                  return {
                      headers: {
                          Authorization: `Bearer ${accessToken}`, // Fixed template literal
                      },
                  };
              },
          })
        : undefined; // Fixed typo "unddefined"

// Data Provider
export const dataProvider = graphqlDataProvider(client);

// Live Provider
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;