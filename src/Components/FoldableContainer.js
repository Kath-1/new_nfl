import { useState } from "react";

const FoldableContainer = ({ children, label }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="expandable-container">
      <div
        className="expandable-container-label"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => (e.code === "Enter" ? setExpanded(!expanded) : null)}
        role="button"
        tabIndex={0}
      >
        {label}
      </div>
      {expanded ? (
        <div className="expandable-container-body">{children}</div>
      ) : null}
    </div>
  );
};

export default FoldableContainer;
