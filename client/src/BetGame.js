import React from "react";

const BetGame = ({ game }) => {
  return (
    <fieldset
      style={{
        display: "flex",
        padding: "20px 0",
        justifyContent: "center",
        border: "none",
        backgroundColor: "#fff",

        borderRadius: "5px",
        marginBottom: "10px",
        boxShadow: "0 2px 2px 0 rgba(0,0,0,.16)",
        width: "100%",
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
            style={{ height: "40px", marginRight: "5px" }}
            alt="team logo"
            src={game.awayTeam.logo}
          />
          <div>
            <p>{game.awayTeam.shortName}</p>
            <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
              {game.awayOdds}
            </p>
          </div>
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
          <div>
            <p>{game.homeTeam.shortName}</p>
            <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
              {game.homeOdds}
            </p>
          </div>
          <img
            style={{ height: "40px", marginLeft: "5px" }}
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
