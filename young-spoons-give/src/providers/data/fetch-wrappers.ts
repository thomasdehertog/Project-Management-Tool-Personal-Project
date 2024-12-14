import { GraphQLFormattedError } from 'graphql';

type Error = {
    message: string;
    statusCode: string | number; // Adjusted to allow both string and number
};

const customFetch = async (url: string, options: RequestInit) => {
    const accessToken = localStorage.getItem('access_token');

    const headers = options.headers as Record<string, string>;

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`, // Corrected template literal usage
            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",
        },
    });
};

const getGraphQLErrors = (
    body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
    if (!body) {
        return {
            message: 'Unknown error',
            statusCode: "INTERNAL_SERVER_ERROR",
        };
    }

    if ("errors" in body) {
        const errors = body?.errors;

        const messages = errors
            ?.map((error) => error?.message)
            ?.join(", "); // Separate messages with commas for readability
        const code = errors?.[0]?.extensions?.code; // Corrected `errors` reference

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500, // Default status code is 500
        };
    }

    return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);

    const responseClone = response.clone();
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if (error) {
        throw error;
    }

    return response;
};