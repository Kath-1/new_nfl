import { gql, useQuery } from "@apollo/client";
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
    }
  }
`;

const BettingPage = () => {
  const { loading, error, data } = useQuery(GET_GAMES_TO_BET);

  if (loading || error) {
    return <p>Hm...</p>;
  }

  return (
    <section
      style={{ maxWidth: "700px", margin: "0 auto", backgroundColor: "#FFF" }}
    >
      <form>
        {data.currentRound.map((game) => (
          <BetGame game={game} />
        ))}
      </form>
    </section>
  );
};

export default BettingPage;
