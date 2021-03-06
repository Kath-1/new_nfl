import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import BetGame from "./BetGame";
import { Button } from "./Components";
import { GET_GAMES_TO_BET } from "./queries";

const BettingForm = ({ client }) => {
  const [bettingSum, setBettingSum] = useState(0);
  const { loading, error, data } = useQuery(GET_GAMES_TO_BET);
  const [showinvalidFieldsMessage, setShowInvalidFieldsMessage] =
    useState(false);
  const [potentialWins, setPotentialWins] = useState({});

  useEffect(() => {
    if (data?.getRound?.games.length) {
      let totalPlacedBets = 0;
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        totalPlacedBets += game.bets[0].stake || 0;
      }
      setBettingSum(data.getRound.roundValue - totalPlacedBets);
    }
  });

  useEffect(() => {
    calcPotentialWins(
      data?.getRound?.games?.filter((game) => game.bettingState === "OPEN")
    );
  }, [data]);

  const calcPotentialWins = (games) => {
    const potentialWins = {};
    if (games?.length) {
      games.forEach((game) => {
        const bet = game.bets[0];
        const win =
          bet.pick === "HOME"
            ? game.homeOdds * bet.stake
            : bet.pick === "AWAY"
            ? game.awayOdds * bet.stake
            : 0;
        potentialWins[game.id] = win;
      });
      setPotentialWins(potentialWins);
    }
  };

  const saveForm = () => {
    console.log(data.getRound);
  };

  const lockInBets = () => {
    setShowInvalidFieldsMessage(!validateData(openForBets));
  };

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

  if (loading || error) {
    return <p>Hm...</p>;
  }

  const { games } = data.getRound;
  const openForBets = games.filter((game) => game.bettingState === "OPEN");
  const upcomingGames = games.filter((game) => game.bettingState !== "OPEN");

  openForBets.forEach((game) => {
    game.bets.forEach((bet) => {
      const setStake = client.readFragment({
        id: `Bet:${bet.id}`,
        fragment: gql`
          fragment Stake on Bet {
            stake
          }
        `,
      });

      if (setStake.stake === null) {
        client.writeFragment({
          id: `Bet:${bet.id}`,
          fragment: gql`
            fragment NewStake on Bet {
              stake
            }
          `,
          data: {
            stake: data.getRound.roundValue / data.getRound.games.length,
          },
        });
      }
    });
  });

  return (
    <section
      style={{
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveForm(e);
        }}
        noValidate={true}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#FFF",
            width: "100%",
            zIndex: 10,
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              text="Lock in bets"
              onClick={lockInBets}
              type="button"
              margin="0 5px 0  0"
            />
            <Button text="Save" />
          </div>
          <div
            style={{
              fontSize: "20px",
              color: bettingSum >= 0 ? "black" : "red",
              paddingRight: "10px",
            }}
          >{`$ ${bettingSum}`}</div>
        </header>
        {openForBets.map((game) => (
          <BetGame
            game={game}
            key={game.id}
            handleBetChange={handleBetChange}
            potentialWin={potentialWins[game.id]}
          />
        ))}
        <h2>Upcoming games</h2>
        {upcomingGames.map((game) => (
          <BetGame
            game={game}
            key={game.id}
            handleBetChange={handleBetChange}
            disabled={true}
          />
        ))}
        {showinvalidFieldsMessage ? <div>Fix errors</div> : null}
      </form>
    </section>
  );
};

function validateData(data) {
  let dataIsValid = true;
  data.forEach((game) => {
    if (
      (game.bets[0].pick !== "HOME" && game.bets[0].pick !== "AWAY") ||
      !game.bets[0].stake
    ) {
      dataIsValid = false;
    }
  });
  return dataIsValid;
}

export default BettingForm;
