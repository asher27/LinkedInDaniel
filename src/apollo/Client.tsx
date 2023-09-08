// Container component
import {ApolloClient, InMemoryCache, ApolloProvider, TypePolicies} from '@apollo/client';

const typePolicies: TypePolicies = {
    Query: {
        fields: {
            postPaginatedList: {
                keyArgs: false,
                merge(existing= [], incoming) {
                    return [...existing, ...incoming];
                }
            }
        }
    }
}

const client = new ApolloClient({
    uri: 'https://wanaque.stepzen.net/api/hoping-tapir/__graphql',
    headers: {'Authorization':'apikey wanaque::stepzen.io+1000::4e1720a07b7a61f9826fab6abd309a6e98f034058964d28c34c5cc8cc388a2e9'},
    cache: new InMemoryCache({typePolicies}),
});

export default client;
