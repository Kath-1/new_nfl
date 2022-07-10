import React from "react";

const BetGame = ({ game }) => {
  return (
    <fieldset
      style={{
        display: "flex",
        padding: "20px 0",
        justifyContent: "center",
        border: "none",
      }}
    >
      <label className="form-control">
        <input
          type="radio"
          id={game.id + game.awayTeam.nickname}
          name={game.id}
        />
        <div>
          <img
            style={{ height: "40px" }}
            alt="team logo"
            src={game.awayTeam.logo}
          />
          {game.awayTeam.shortName}
        </div>
      </label>
      <div style={{ display: "flex", alignItems: "center", fontSize: "2rem" }}>
        @
      </div>
      <label className="form-control">
        <span style={{ position: "absolute", right: "-20px" }}>$</span>
        <input
          type="radio"
          id={game.id + game.homeTeam.nickname}
          name={game.id}
        />
        <div>
          {game.homeTeam.shortName}
          <img
            style={{ height: "40px" }}
            alt="team logo"
            src={game.awayTeam.logo}
          />
        </div>
      </label>
      <input
        type="number"
        min="20"
        max="9999"
        style={{ width: "100px", fontSize: "1.5rem", paddingLeft: "25px" }}
      />
    </fieldset>
  );
};

export default BetGame;
