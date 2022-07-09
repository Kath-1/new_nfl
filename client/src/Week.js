import React from "react";
import { useQuery, gql } from "@apollo/client";
import Game from "./Game";
import FoldableContainer from "./Components/FoldableContainer";

const GET_CURRENT_WEEK = gql`
  query currentRound {
    currentRound {
      id
      gameState
      winner
      homeTeam {
        nickname
        city
        conference
        fullName
        shortName
        logo
      }
      awayTeam {
        shortName
        fullName
        city
        nickname
        logo
      }
      bets {
        pick
        score
        player
      }
    }
  }
`;

function Week() {
  const { loading, error, data } = useQuery(GET_CURRENT_WEEK);
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const ongoingGames = data.currentRound.filter(
    (game) => game.gameState === "ONGOING"
  );
  const upcomingGames = data.currentRound.filter(
    (game) => game.gameState === "UPCOMING"
  );
  const finishedGames = data.currentRound.filter(
    (game) => game.gameState === "FINISHED"
  );

  return (
    <div style={{ margin: "0px auto", maxWidth: "700px" }}>
      <FoldableContainer label="Currently playing" initialState={true}>
        {ongoingGames.map((game) => {
          return <Game game={game} key={game.id} />;
        })}
      </FoldableContainer>
      <FoldableContainer label="Upcoming games">
        {upcomingGames.map((game) => {
          return <Game game={game} key={game.id} />;
        })}
      </FoldableContainer>
      <FoldableContainer label="Finished playing">
        {finishedGames.map((game) => {
          return <Game game={game} key={game.id} />;
        })}
      </FoldableContainer>
    </div>
  );
}

export default Week;
