import { gql, useQuery, ApolloConsumer } from "@apollo/client";
import React from "react";
import BetGame from "./BetGame";

const GET_GAMES_TO_BET = gql`
  query getGamesToBet {
    currentRound {
      id
      homeOdds
      awayOdds
      homeTeam {
        nickname
        logo
        shortName
      }
      awayTeam {
        nickname
        logo
        shortName
      }
      bets {
        id
        stake
        pick
      }
    }
  }
`;

const BettingPage = () => {
  return <WithApolloClient />;
};

const WithApolloClient = () => (
  <ApolloConsumer>{(client) => <BettingForm client={client} />}</ApolloConsumer>
);

const BettingForm = ({ client }) => {
  const { loading, error, data } = useQuery(GET_GAMES_TO_BET);

  if (loading || error) {
    return <p>Hm...</p>;
  }

  const handleBetChange = (e) => {
    const { id, type } = e.target.dataset;
    const value = type === "stake" ? Number(e.target.value) : e.target.value;

    const betId = `Bet:${id}`;

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
          console.log(data.currentRound);
        }}
      >
        <button>Test</button>
        {data.currentRound.map((game) => (
          <BetGame
            game={game}
            key={game.id}
            handleBetChange={handleBetChange}
          />
        ))}
      </form>
    </section>
  );
};

export default BettingPage;
