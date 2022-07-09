import React from "react";

function Game({ game }) {
  //const matches = useMediaQuery("(min-width: 768px)");

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "10px 0 10px 0",
        borderRadius: "5px",
        marginBottom: "10px",
        boxShadow: "0 2px 2px 0 rgba(0,0,0,.16)",
        width: "100%",
      }}
    >
      <h2
        style={{ textAlign: "center" }}
      >{`${game.awayTeam.nickname} @ ${game.homeTeam.nickname}`}</h2>
      <h3 style={{ textAlign: "center" }}>{game.gameState}</h3>

      <div
        style={{
          display: "flex",
          margin: "0 auto",
          textAlign: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {game.bets.map((bet) => (
          <div
            key={bet.player + bet.pick}
            style={{
              color: "#001542",
              margin: "2px",
            }}
          >
            <div>{bet.player}</div>
            <div
              style={{
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {bet.pick === "TIE" ? (
                <div>X</div>
              ) : bet.pick === "HOME" || bet.pick === "AWAY" ? (
                <img
                  style={{ height: "30px" }}
                  alt="team logo"
                  src={
                    bet.pick === "HOME"
                      ? game.homeTeam.logo
                      : game.awayTeam.logo
                  }
                />
              ) : (
                <div>–</div>
              )}
            </div>
            <div>{bet.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
