import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/apolloClient';
import HelloWorld from './src/HelloWorld';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <HelloWorld />
        </ApolloProvider>
    );
};

export default App;