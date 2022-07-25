import { gql, useQuery, ApolloConsumer } from "@apollo/client";
import React, { useState } from "react";
import BetGame from "./BetGame";
import { GET_GAMES_TO_BET } from "./queries";

const BettingPage = () => {
  return (
    <ApolloConsumer>
      {(client) => <BettingForm client={client} />}
    </ApolloConsumer>
  );
};

const BettingForm = ({ client }) => {
  const { loading, error, data } = useQuery(GET_GAMES_TO_BET);
  const [showinvalidFieldsMessage, setShowInvalidFieldsMessage] =
    useState(false);

  function validateData() {
    let hasInvalidFields = false;
    data.currentRound.every((game) => {
      if (game.bets[0].pick !== "HOME" && game.bets[0].pick !== "AWAY") {
        setShowInvalidFieldsMessage(true);
        return false;
      }
    });
    if (hasInvalidFields) {
      setShowInvalidFieldsMessage(true);
    }
  }

  function saveForm() {
    console.log(data.currentRound);
  }

  function lockInBets() {
    validateData();
    console.log(data.currentRound);
  }

  if (loading || error) {
    return <p>Hm...</p>;
  }

  const handleBetChange = (e) => {
    const { id, type } = e.target.dataset;
    let value = type === "stake" ? Number(e.target.value) : e.target.value;
    const betId = `Bet:${id}`;

    if (type === "pick") {
      const bet = client.readFragment({
        id: `${betId}`,
        fragment: gql`
          fragment MyBet on Bet {
            pick
          }
        `,
      });
      if (value === bet.pick) {
        value = "NONE";
      }
    }

    client.writeFragment({
      id: betId,
      fragment: gql`
        fragment New${type} on Bet {${type}}
      `,
      data: {
        [type]: value,
      },
    });
  };

  return (
    <section
      style={{
        maxWidth: "700px",
        margin: "20px auto",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveForm(e);
        }}
        noValidate={true}
      >
        <button>Save</button>
        <button type="button" onClick={lockInBets}>
          Lock in bets
        </button>
        {data.currentRound.map((game) => (
          <BetGame
            game={game}
            key={game.id}
            handleBetChange={handleBetChange}
          />
        ))}
        {showinvalidFieldsMessage ? <div>Fix errors</div> : null}
      </form>
    </section>
  );
};

export default BettingPage;
