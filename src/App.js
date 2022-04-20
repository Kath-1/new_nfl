import { createRoot } from "react-dom/client";
import React from "react";

const App = () => {
  return React.createElement("h1", {}, "Hej appen!");
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(App());
