import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_CURRENT_WEEK = gql`
  query GetCurrentWeek {
    games {
      id
      homeTeam {
        nickname
        city
        conference
      }
    }
  }
`;

function Week() {
  const { loading, error, data } = useQuery(GET_CURRENT_WEEK);
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  return (
    <div>
      <h2>Current week!</h2>
      {JSON.stringify(data)}
    </div>
  );
}

export default Week;
