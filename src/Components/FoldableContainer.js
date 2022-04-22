import { useState } from "react";
import arrowDownIcon from "../icons/caret_down_icon.svg";
import arrowRightIcon from "../icons/caret_right_icon.svg";

const FoldableContainer = ({ children, label }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="expandable-container">
      <div
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => (e.code === "Enter" ? setExpanded(!expanded) : null)}
        role="button"
        tabIndex={0}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          border: "1px solid #888",
        }}
      >
        <img
          src={expanded ? arrowDownIcon : arrowRightIcon}
          height="30px"
          alt="mySvgImage"
          style={{ marginRight: "10px" }}
        />
        {label}
      </div>
      {expanded ? <div style={{ padding: "10px" }}>{children}</div> : null}
    </div>
  );
};

export default FoldableContainer;
