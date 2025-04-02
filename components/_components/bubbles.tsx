import React from "react";

const Bubble: React.FC<{ style: React.CSSProperties; color: string }> = ({
  style,
  color,
}) => {
  return (
    <div
      className="bubble z-0"
      style={{
        ...style,
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: color,
        width: "70px",
        height: "70px",
        pointerEvents: "none",
      }}
    />
  );
};

export default Bubble;
