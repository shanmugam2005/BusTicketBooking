import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql', 
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FjNjQ0YjQ1YTY1ZDc4NzMxNTYzZGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDAwNDY5MDQsImV4cCI6MTc0MDA1MDUwNH0.Op647oEa9ioDNU7bPuUH6KTriNHfKAmmJQ-IuGRCfkU`, // If no token, it won't add the Authorization header
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the authLink and httpLink
  cache: new InMemoryCache(),       // Use InMemoryCache to manage Apollo Client's cache
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)

