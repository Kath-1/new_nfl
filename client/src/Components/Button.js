const Button = ({ text, onClick, type, margin }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      backgroundColor: "darkblue",
      color: "#fff",
      padding: "8px",
      border: "none",
      borderRadius: "5px",
      margin,
    }}
  >
    {text}
  </button>
);

export default Button;
