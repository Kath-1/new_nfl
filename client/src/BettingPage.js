import { ApolloConsumer } from "@apollo/client";
import React from "react";
import BettingForm from "./BettingForm";

const BettingPage = () => {
  return (
    <ApolloConsumer>
      {(client) => <BettingForm client={client} />}
    </ApolloConsumer>
  );
};

export default BettingPage;
