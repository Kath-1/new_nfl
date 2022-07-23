import React from "react";

const BetGame = ({ game, handleBetChange }) => {
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
          name={game.id}
          value="AWAY"
          checked={game.bets[0].pick === "AWAY"}
          onChange={handleBetChange}
          data-id={game.bets[0].id}
          data-type="pick"
          required
          disabled={!(game.bettingState === "OPEN")}
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
          name={game.id}
          value="HOME"
          checked={game.bets[0].pick === "HOME"}
          onChange={handleBetChange}
          data-id={game.bets[0].id}
          data-type="pick"
          required
          disabled={!(game.bettingState === "OPEN")}
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
        data-id={game.bets[0].id}
        data-type="stake"
        type="number"
        min="20"
        max="9999"
        style={{ width: "100px", fontSize: "1.5rem", paddingLeft: "25px" }}
        value={game.bets[0]?.stake === null ? 100 : game.bets[0]?.stake}
        onChange={handleBetChange}
        name="amount"
        disabled={!(game.bettingState === "OPEN")}
      />
    </fieldset>
  );
};

export default BetGame;
