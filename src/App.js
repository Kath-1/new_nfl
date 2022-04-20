import { createRoot } from "react-dom/client";
import { FoldableContainer } from "./Components";

const App = () => (
  <>
    <h1>Test med JSX</h1>
    <FoldableContainer label="Test">
      <div>Render me!</div>
    </FoldableContainer>
  </>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
