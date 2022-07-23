import { gql } from "@apollo/client";

export const GET_GAMES_TO_BET = gql`
  query getGamesToBet {
    currentRound {
      id
      homeOdds
      awayOdds
      bettingState
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
