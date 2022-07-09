import React from "react";

const BetGame = ({ game }) => {
  return (
    <fieldset
      style={{
        display: "flex",

        padding: "20px 0",
      }}
    >
      <label className="form-control">
        <input
          type="radio"
          id={game.id + game.awayTeam.nickname}
          name={game.id}
        />
        <span>{game.awayTeam.nickname}</span>
      </label>
      <label className="form-control">
        <input
          type="radio"
          id={game.id + game.homeTeam.nickname}
          name={game.id}
        />
        <span>{game.homeTeam.nickname}</span>
      </label>

      <input type="number" min="20" style={{ width: "60px" }} />
    </fieldset>
  );
};

export default BetGame;
