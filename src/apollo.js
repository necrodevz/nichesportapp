import { ApolloClient, createNetworkInterface } from 'react-apollo';


const networkInterface = createNetworkInterface({
    uri: process.env.REACT_APP_GQL_URI
})

export const client = new ApolloClient({
    networkInterface:networkInterface
})