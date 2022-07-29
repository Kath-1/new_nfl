import { gql } from "@apollo/client";

export const GET_GAMES_TO_BET = gql`
  query getGamesToBet {
    getRound {
      roundValue
      games {
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
  }
`;

export const GET_CURRENT_WEEK = gql`
  query currentWeek {
    getRound {
      games {
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
          id
          pick
          score
          player
        }
      }
    }
  }
`;
