import React from "react";
import { Link } from "react-router-dom";

const PageHeader = () => (
  <header
    style={{
      backgroundColor: "darkblue",
      color: "white",
      padding: "10px",
      textAlign: "center",
    }}
  >
    <h1>SBL 2022</h1>
    <nav>
      <Link to="/" style={{ color: "white", margin: "3px" }}>
        Home
      </Link>
      <Link to="/bet" style={{ color: "white", margin: "3px" }}>
        Bet
      </Link>
    </nav>
  </header>
);

export default PageHeader;
