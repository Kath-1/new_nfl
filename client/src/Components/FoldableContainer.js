import { useState } from "react";

const FoldableContainer = ({ children, label }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="expandable-container" style={{ border: "1px solid #888" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => (e.code === "Enter" ? setExpanded(!expanded) : null)}
        role="button"
        tabIndex={0}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {label}
      </div>
      {expanded ? <div style={{ padding: "10px" }}>{children}</div> : null}
    </div>
  );
};

export default FoldableContainer;
