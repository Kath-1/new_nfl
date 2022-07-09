import { useState } from "react";

const FoldableContainer = ({ children, label, initialState }) => {
  const [expanded, setExpanded] = useState(initialState);
  return (
    <div className="expandable-container">
      <div
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => (e.code === "Enter" ? setExpanded(!expanded) : null)}
        role="button"
        tabIndex={0}
        style={{
          padding: "10px 3px 10px 3px",
        }}
      >
        {label}{" "}
        {expanded ? (
          <span>{">"}</span>
        ) : (
          <span style={{ transform: "rotate(90deg)" }}>{">"}</span>
        )}
      </div>
      {expanded ? <div>{children}</div> : null}
    </div>
  );
};

export default FoldableContainer;
