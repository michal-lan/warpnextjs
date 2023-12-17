import {
    deleteRefreshToken,
    getInMemoryAuthToken,
    getRefreshToken,
    isTokenExpired,
    setAuthToken,
} from '@/utils/auth'
import {
    ApolloClient,
    InMemoryCache,
    from,
    HttpLink,
    ApolloLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { v4 as uuid } from 'uuid'
import fetch from 'isomorphic-fetch'

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
    fetch,
    // credentials: 'include', // if backend is on different domain or 'same-origin' if on the same
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authMiddleware = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists
    const token = getInMemoryAuthToken()

    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    })

    return forward(operation)
})

const refreshTokenLink = new TokenRefreshLink({
    accessTokenField: `refreshJwtAuthToken`,
    isTokenValidOrUndefined: async (): Promise<boolean> => {
        let token = getInMemoryAuthToken()

        return !token || (token && !isTokenExpired(token)) ? false : true
    },
    fetchAccessToken: () => {
        const query = `
            mutation RefreshJWTAuthToken($input: RefreshJwtAuthTokenInput!) {
              refreshJwtAuthToken(input: $input) {
                authToken
              }
            }
          `
        return fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, {
            method: 'POST',
            mode: 'cors',
            // credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: {
                    input: {
                        clientMutationId: uuid(),
                        jwtRefreshToken: getRefreshToken(),
                    },
                },
            }),
        })
    },
    handleFetch: (response: any) => {
        if (response.errors && response.errors.length) return
        console.log('HandleFetch', response)
        setAuthToken(response.refreshJwtAuthToken.authToken)
    },
    handleError: err => {
        // console.error(err)
        deleteRefreshToken()
    },
})

const makeApolloRequest = async <T>(query: any, variables?: any) => {
    let data: any = {}
    try {
        const client = new ApolloClient({
            link: from([authMiddleware, errorLink, refreshTokenLink, httpLink]),
            cache: new InMemoryCache(),
        })

        const response = await client.query<T>({
            query,
            variables,
            errorPolicy: 'all',
        })

        data = response && response.data
    } catch (err) {
        // console.log('err', err)
        throw new Error('Failed to fetch API')
    }

    return { data }
}

export default makeApolloRequest
