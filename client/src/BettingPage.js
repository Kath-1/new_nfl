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

  const handleChange = (e) => {
    const { value } = e.target;
    const id = e.target.dataset.id;

    const betId = `Bet:${id}`;

    client.writeFragment({
      id: betId,
      fragment: gql`
        fragment NewBet on Bet {
          stake
        }
      `,
      data: {
        stake: value,
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
        }}
      >
        <button>Test</button>
        {data.currentRound.map((game) => (
          <BetGame game={game} key={game.id} handleInputChange={handleChange} />
        ))}
      </form>
    </section>
  );
};

export default BettingPage;
