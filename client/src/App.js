import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Home";
import BettingPage from "./BettingPage";
import PageHeader from "./PageHeader";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <PageHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="bet" element={<BettingPage />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
