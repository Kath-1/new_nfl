import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Week from "./Week";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Week />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
